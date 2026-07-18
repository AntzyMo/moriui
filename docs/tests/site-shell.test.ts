import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

const themeUrl = new URL('../app/site/use-site-theme.ts', import.meta.url)
const headerUrl = new URL('../app/site/SiteHeader.vue', import.meta.url)
const frameUrl = new URL('../app/site/DocumentFrame.vue', import.meta.url)
const sidebarUrl = new URL('../app/site/DocumentSidebar.vue', import.meta.url)
const tocUrl = new URL('../app/site/OnThisPage.vue', import.meta.url)

describe('new documentation shell', () => {
  it('writes theme state to html[data-theme] through the new composable', async () => {
    const source = await readFile(themeUrl, 'utf8')

    expect(source).toMatch(
      /useColorMode\(\{[\s\S]*selector:\s*['"]html['"][\s\S]*attribute:\s*['"]data-theme['"][\s\S]*storageKey:\s*['"]moriui-docs-theme['"][\s\S]*emitAuto:\s*false/
    )
    expect(source).toMatch(
      /theme\.value\s*=\s*theme\.value\s*===\s*['"]dark['"]\s*\?\s*['"]light['"]\s*:\s*['"]dark['"]/
    )
    expect(source).toMatch(/theme:\s*readonly\(theme\)/)
  })

  it('provides a centered dual-mode MoriUI header with a docs-only section row', async () => {
    const source = await readFile(headerUrl, 'utf8')
    const moriuiButtonImport = /import\s*\{\s*Button\s*\}\s*from\s*['"]moriui['"]/

    expect(source).toMatch(/defineProps<[\s\S]*mode:\s*'home'\s*\|\s*'docs'/)
    expect(source).toMatch(moriuiButtonImport)
    expect(source).toMatch(/max-w-\[1360px\]/)
    expect(source).toMatch(/文档[\s\S]*组件[\s\S]*主题[\s\S]*示例[\s\S]*搜索[\s\S]*GitHub/)
    expect(source).toMatch(/v-if="mode === 'docs'"/)
    expect(source).toMatch(/开始使用[\s\S]*组件[\s\S]*发布说明[\s\S]*迁移/)
    expect(source).not.toMatch(/<header[^>]*border-b/)
  })

  it('shares the same registry sidebar between a MoriUI mobile Sheet and the desktop three-column frame', async () => {
    const [frame, sidebar] = await Promise.all([
      readFile(frameUrl, 'utf8'),
      readFile(sidebarUrl, 'utf8')
    ])

    expect(frame).toMatch(/from\s*['"]moriui['"]/)
    expect(frame).toMatch(/<SheetTrigger[^>]*as-child/)
    expect(frame).toMatch(/<SheetContent[^>]*side="left"/)
    expect(frame.match(/<DocumentSidebar/g)).toHaveLength(2)
    expect(frame).toMatch(/max-w-\[1360px\]/)
    expect(frame).toMatch(/lg:grid-cols-\[14rem_minmax\(0,46rem\)\]/)
    expect(frame).toMatch(/xl:grid-cols-\[14rem_minmax\(0,46rem\)_12rem\]/)
    expect(frame).toMatch(/lg:hidden/)
    expect(frame).toMatch(/<main[^>]*>\s*<slot\s*\/>\s*<\/main>/)
    expect(sidebar).toMatch(/componentRegistry/)
    expect(sidebar).toMatch(/guidePages/)
    expect(sidebar).toMatch(/`\/docs\/components\/\$\{item\.slug\}`/)
  })

  it('hides an empty right rail and renders route-synchronised TOC links backed by MoriUI buttons', async () => {
    const source = await readFile(tocUrl, 'utf8')
    const moriuiButtonImport = /import\s*\{\s*Button\s*\}\s*from\s*['"]moriui['"]/

    expect(source).toMatch(/v-if="items\.length"/)
    expect(source).toMatch(/hidden[\s\S]*xl:grid/)
    expect(source).toMatch(moriuiButtonImport)
    expect(source).toMatch(/<NuxtLink/)
    expect(source).toMatch(/:to="\{ path: route\.path, hash: `#\$\{item\.id\}` \}"/)
    expect(source).not.toMatch(/:href=/)
    expect(source).not.toMatch(/Newsletter|<input|<button/)
  })
})
