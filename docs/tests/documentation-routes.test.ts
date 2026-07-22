import { readdir, readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

import { guidePages } from '../app/documentation/toc'
import { componentSlugs } from '../app/documentation/inventory'
import { staticRoutes } from '../app/documentation/routes'

async function collectContentPaths(directory: URL, prefix = ''): Promise<readonly string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const paths = await Promise.all(entries.map(async (entry) => {
    if (entry.isDirectory())
      return collectContentPaths(new URL(`${entry.name}/`, directory), `${prefix}${entry.name}/`)

    return entry.name.endsWith('.md')
      ? [`/docs/${prefix}${entry.name.replace(/\.md$/, '')}`]
      : []
  }))

  return paths.flat()
}

describe('documentation routes', () => {
  it('保留首页、五篇真实指南、组件目录与全部组件，共 68 条静态路由', async () => {
    const contentFiles = (await collectContentPaths(new URL('../content/docs/', import.meta.url))).sort()
    const componentRoutes = componentSlugs.map(slug => `/docs/components/${slug}`)
    const expected = [
      '/',
      ...guidePages.map(guide => guide.path),
      '/docs/components',
      ...componentRoutes
    ]

    expect(contentFiles).toEqual([
      ...guidePages.map(guide => guide.path),
      ...componentRoutes
    ].sort())
    for (const slug of componentSlugs) {
      expect(contentFiles).toContain(`/docs/components/${slug}`)
      expect(staticRoutes).toContain(`/docs/components/${slug}`)
    }

    expect(staticRoutes).toEqual(expected)
    expect(staticRoutes).toHaveLength(68)
    expect(new Set(staticRoutes).size).toBe(staticRoutes.length)
    expect(staticRoutes).toContain('/docs/getting-started')
    expect(staticRoutes).not.toContain('/docs/overview')
    expect(staticRoutes).not.toContain('/docs/accessibility')
  })

  it('feeds the new route list directly to Nitro without disabling SSR', async () => {
    const source = await readFile(new URL('../nuxt.config.ts', import.meta.url), 'utf8')
    const routeImportPattern = /from\s*['"]\.\/app\/documentation\/routes['"]/

    expect(source).toMatch(routeImportPattern)
    expect(source).toMatch(/routes:\s*staticRoutes/)
    expect(source).not.toMatch(/ssr:\s*false/)
  })
})
