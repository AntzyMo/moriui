import { readdir, readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

import { guidePages } from '../app/documentation/toc'
import { staticRoutes } from '../app/documentation/routes'
import { componentRegistry } from '../app/documentation/registry'

describe('documentation routes', () => {
  it('保留首页、五篇真实指南、组件目录与全部组件，共 67 条静态路由', async () => {
    const contentFiles = (await readdir(new URL('../content/docs/', import.meta.url)))
      .filter(file => file.endsWith('.md'))
      .map(file => `/docs/${file.replace(/\.md$/, '')}`)
      .sort()
    const componentRoutes = componentRegistry.map(item => `/docs/components/${item.slug}`)
    const expected = [
      '/',
      ...guidePages.map(guide => guide.path),
      '/docs/components',
      ...componentRoutes
    ]

    expect(contentFiles).toEqual(guidePages.map(guide => guide.path).sort())
    expect(staticRoutes).toEqual(expected)
    expect(staticRoutes).toHaveLength(67)
    expect(new Set(staticRoutes).size).toBe(staticRoutes.length)
    expect(staticRoutes).toContain('/docs/getting-started')
    expect(staticRoutes).toContain('/docs/components/button')
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
