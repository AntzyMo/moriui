import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

import { getGuidePage, guidePages } from '../app/documentation/toc'

const routeUrl = new URL('../app/pages/docs/[...slug].vue', import.meta.url)

describe('guide content and route', () => {
  it('defines five guides whose TOC anchors are real headings in their new content', async () => {
    expect(guidePages.map(guide => guide.path)).toEqual([
      '/docs/getting-started',
      '/docs/installation',
      '/docs/themes',
      '/docs/releases',
      '/docs/migration'
    ])

    for (const guide of guidePages) {
      const slug = guide.path.split('/').at(-1)
      const source = await readFile(new URL(`../content/docs/${slug}.md`, import.meta.url), 'utf8')

      for (const item of guide.toc) {
        expect(source).toContain(`## ${item.label}`)
      }
      expect(getGuidePage(guide.path)).toBe(guide)
    }
    expect(getGuidePage('/docs/not-real')).toBeUndefined()
  })

  it('documents installation, html data themes, releases, and migration with original Chinese copy', async () => {
    const [gettingStarted, installation, themes, releases, migration] = await Promise.all(
      ['getting-started', 'installation', 'themes', 'releases', 'migration'].map(slug =>
        readFile(new URL(`../content/docs/${slug}.md`, import.meta.url), 'utf8')
      )
    )

    expect(gettingStarted).toContain('MoriUI')
    expect(installation).toContain('@import "tailwindcss";')
    expect(installation).toContain('@import "moriui/style.css";')
    expect(installation).toContain('import { Button } from \'moriui\'')
    expect(themes).toContain('data-theme="light"')
    expect(themes).toContain('data-theme="dark"')
    expect(releases).toContain('版本')
    expect(migration).toContain('迁移')
    expect([gettingStarted, installation, themes, releases, migration].join('\n')).not.toContain(
      'HeroUI'
    )
  })

  it('loads only registered guide content inside the new docs shell and throws a fatal 404 otherwise', async () => {
    const source = await readFile(routeUrl, 'utf8')

    expect(source).toMatch(/getGuidePage\(route\.path\)/)
    expect(source).toMatch(/queryCollection\(['"]content['"]\)\.path\(route\.path\)\.first\(\)/)
    expect(source).toMatch(/statusCode:\s*404/)
    expect(source).toMatch(/statusMessage:\s*['"]页面不存在['"]/)
    expect(source).toMatch(/fatal:\s*true/)
    expect(source).toMatch(/<SiteHeader mode="docs"/)
    expect(source).toMatch(/<DocumentFrame\s+:toc="guide\.toc"/)
    expect(source).toMatch(/<ContentRenderer[^>]*:value="page"/)
  })
})
