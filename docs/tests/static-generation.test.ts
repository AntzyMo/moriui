import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

describe('static generation configuration', () => {
  it('uses the workspace build pipeline on Vercel', async () => {
    const [rootPackageJson, vercelConfig] = await Promise.all([
      readFile(new URL('../../package.json', import.meta.url), 'utf8'),
      readFile(new URL('../../vercel.json', import.meta.url), 'utf8')
    ])
    const rootScripts = (JSON.parse(rootPackageJson) as { scripts: Record<string, string> }).scripts
    const vercel = JSON.parse(vercelConfig) as { buildCommand?: string, outputDirectory?: string }

    expect(rootScripts['build:docs']).toBe('pnpm --dir packages/core run build && pnpm --dir docs run generate')
    expect(vercel.buildCommand).toBe('pnpm run build:docs')
    expect(vercel.outputDirectory).toBe('docs/.output/public')
  })

  it('keeps Nuxt generate, SSR prerendering, and the new registry-derived route list', async () => {
    const [nuxtConfig, packageJson] = await Promise.all([
      readFile(new URL('../nuxt.config.ts', import.meta.url), 'utf8'),
      readFile(new URL('../package.json', import.meta.url), 'utf8')
    ])
    const scripts = (JSON.parse(packageJson) as { scripts: Record<string, string> }).scripts

    expect(nuxtConfig).toMatch(/from\s*['"]\.\/app\/documentation\/routes['"]/)
    expect(nuxtConfig).toMatch(/nitro:[\s\S]*prerender:[\s\S]*routes:\s*staticRoutes/)
    expect(nuxtConfig).not.toMatch(/ssr:\s*false/)
    expect(scripts.build).toBe('pnpm --dir ../packages/core run build && nuxt generate')
  })

  it('loads only Tailwind, MoriUI styles, and a small accessible base layer', async () => {
    const source = await readFile(new URL('../app/assets/css/main.css', import.meta.url), 'utf8')

    expect(source).toContain('@import "tailwindcss";')
    expect(source).toContain('@import "moriui/style.css";')
    expect(source).toMatch(/@layer base/)
    expect(source).not.toMatch(/--(?:primary|background|foreground|card)\s*:/)
  })
})
