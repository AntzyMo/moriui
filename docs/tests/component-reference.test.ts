import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

import { componentRegistry } from '../app/documentation/registry'

const componentReferenceUrl = new URL('../app/components/ComponentReference.vue', import.meta.url)
const catalogUrl = new URL('../app/components/ComponentCatalog.vue', import.meta.url)
const sidebarUrl = new URL('../app/site/DocumentSidebar.vue', import.meta.url)
const comingSoonUrl = new URL('../app/components/ComingSoonPage.vue', import.meta.url)
const codeBlockUrl = new URL('../app/components/CodeBlock.vue', import.meta.url)
const examplePanelUrl = new URL('../app/components/ExamplePanel.vue', import.meta.url)
const componentRouteUrl = new URL('../app/pages/docs/components/[slug].vue', import.meta.url)
const nuxtConfigUrl = new URL('../nuxt.config.ts', import.meta.url)

describe('component catalog and reference pages', () => {
  it('仅通过注册表加载示例，避免 Nuxt 自动组件名冲突', async () => {
    const config = await readFile(nuxtConfigUrl, 'utf8')

    expect(config).toMatch(
      /components:\s*\[\s*\{[\s\S]*path:\s*['"]~\/components['"][\s\S]*ignore:\s*\[['"]examples\/\*\*['"]\]/
    )
  })

  it('从共享组件目录读取文档展示组件', async () => {
    expect(componentReferenceUrl.pathname).toContain('/app/components/ComponentReference.vue')
    expect(examplePanelUrl.pathname).toContain('/app/components/ExamplePanel.vue')
    expect(await readFile(componentReferenceUrl, 'utf8')).not.toContain('~/reference/')
  })

  it('renders registry previews and links in a fixed-width catalog', async () => {
    const [catalog, sidebar] = await Promise.all([
      readFile(catalogUrl, 'utf8'),
      readFile(sidebarUrl, 'utf8')
    ])
    const moriuiCatalogImports
      = /import\s*\{[\s\S]*Button[\s\S]*Card[\s\S]*\}\s*from\s*['"]moriui['"]/

    expect(catalog).toMatch(moriuiCatalogImports)
    expect(catalog).toMatch(/v-for="group in componentGroups"/)
    expect(catalog).toMatch(/w-\[210px\]/)
    expect(catalog).toMatch(/h-\[120px\]/)
    expect(catalog).toMatch(/grid-cols-\[repeat\(auto-fill,13\.125rem\)\]/)
    expect(catalog).not.toMatch(/grid-cols-1/)
    expect(catalog).toMatch(/<component\s+:is="item\.catalogPreview"/)
    expect(catalog).toMatch(/`\/docs\/components\/\$\{item\.slug\}`/)
    expect(sidebar).toMatch(
      /\.sort\(\(left, right\) => left\.name\.localeCompare\(right\.name, 'en'\)\)/
    )
  })

  it('按注册表资料渲染动态参考章节，并使用对应的目录', async () => {
    const [reference, route] = await Promise.all([
      readFile(componentReferenceUrl, 'utf8'),
      readFile(componentRouteUrl, 'utf8')
    ])

    expect(reference.indexOf('component.reference.examples')).toBeLessThan(
      reference.indexOf('component.reference.api')
    )
    expect(reference).toMatch(/v-for="example in component\.reference\.examples"/)
    expect(reference).toMatch(/v-for="row in component\.reference\.api"/)
    expect(reference).toMatch(/component\.name.*component\.title/)
    expect(route).toMatch(/getReferenceToc\(publishedComponent\)/)
    expect(route).not.toMatch(/referenceToc/)
  })

  it('renders preview before copyable code and announces copy success', async () => {
    const [panel, codeBlock] = await Promise.all([
      readFile(examplePanelUrl, 'utf8'),
      readFile(codeBlockUrl, 'utf8')
    ])
    const moriuiButtonImport = /import\s*\{\s*Button\s*\}\s*from\s*['"]moriui['"]/

    expect(panel.indexOf('<slot name="preview"')).toBeLessThan(panel.indexOf('<CodeBlock'))
    expect(codeBlock).toMatch(/useClipboard\(\{\s*legacy:\s*true\s*\}\)/)
    expect(codeBlock).toMatch(/copy\(props\.code\)/)
    expect(codeBlock).toMatch(/aria-live="polite"/)
    expect(codeBlock).toMatch(moriuiButtonImport)
    expect(codeBlock).toMatch(/import\s*\{\s*Copy\s*\}\s*from\s*['"]@lucide\/vue['"]/)
    expect(codeBlock).toMatch(/<Tooltip/)
    expect(codeBlock).toMatch(/size="icon-xs"/)
    expect(codeBlock).not.toMatch(/>复制代码</)
    expect(codeBlock).toMatch(/left-1\/2/)
    expect(codeBlock).toMatch(/展开代码/)
    expect(codeBlock).toMatch(/收起代码/)
  })

  it('为复制按钮的 Tooltip 在 SSR 中提供 MoriUI 上下文', async () => {
    const codeBlock = await readFile(codeBlockUrl, 'utf8')

    expect(codeBlock).toMatch(/TooltipProvider/)
    expect(codeBlock).toMatch(/<TooltipProvider>/)
    expect(codeBlock).toMatch(/<\/TooltipProvider>/)
    expect(codeBlock.indexOf('<TooltipProvider>')).toBeLessThan(codeBlock.indexOf('<Tooltip>'))
  })

  it('uses new MoriUI example components as published reference previews', async () => {
    const sources = await Promise.all(
      ['button/catalog', 'input/catalog', 'dialog/catalog'].map(name =>
        readFile(new URL(`../app/components/examples/${name}.vue`, import.meta.url), 'utf8')
      )
    )

    for (const source of sources) {
      expect(source).toMatch(/from\s*['"]moriui['"]/)
    }
    expect(sources[0]).toMatch(/<Button/)
    expect(sources[1]).toMatch(/<Input[^>]*v-model=/)
    expect(sources[2]).toMatch(/<DialogTrigger[^>]*as-child/)
    expect(sources[2]).toMatch(/<DialogContent/)
    expect(sources[2]).toMatch(/<DialogTitle/)
    expect(sources[2]).toMatch(/<DialogDescription/)
    expect(
      componentRegistry
        .filter(item => item.status === 'published')
        .every(item => item.reference)
    ).toBe(true)
  })

  it('表单组合示例提供真实弹层交互与键盘滚动入口', async () => {
    const [buttonDropdown, buttonPopover, buttonSelect, inputDropdown, attachmentGroup]
      = await Promise.all(
        [
          'button-group/button-group-dropdown',
          'button-group/button-group-popover',
          'button-group/button-group-select',
          'input-group/input-group-dropdown',
          'attachment/attachment-group'
        ].map(name =>
          readFile(new URL(`../app/components/examples/${name}.vue`, import.meta.url), 'utf8')
        )
      )

    for (const source of [buttonDropdown, buttonPopover, inputDropdown]) {
      expect(source).toMatch(/<DropdownMenu>/)
      expect(source).toMatch(/<DropdownMenuTrigger as-child>/)
      expect(source).toMatch(/<DropdownMenuContent/)
      expect(source).toMatch(/<DropdownMenuItem>/)
    }
    expect(buttonPopover).not.toMatch(/<Popover/)
    expect(buttonSelect).toMatch(/<Select v-model=/)
    expect(buttonSelect).toMatch(/<SelectTrigger/)
    expect(buttonSelect).toMatch(/<SelectContent>/)
    expect(attachmentGroup).toMatch(/<AttachmentGroup[^>]*tabindex="0"/)

    const assistantMenu = componentRegistry
      .find(item => item.slug === 'button-group')
      ?.reference
      ?.examples
      .find(example => example.shadcnExample === 'button-group-popover')
    expect(assistantMenu?.title).toBe('助手菜单')
    expect(assistantMenu?.description).toContain('DropdownMenu')
  })

  it('routes unknown slugs to 404, published records to references, and the remainder to coming soon', async () => {
    const [route, comingSoon] = await Promise.all([
      readFile(componentRouteUrl, 'utf8'),
      readFile(comingSoonUrl, 'utf8')
    ])

    expect(route).toMatch(/getComponent\(route\.params\.slug as string\)/)
    expect(route).toMatch(/statusCode:\s*404/)
    expect(route).toMatch(/assertPublishedReference\(component\)/)
    expect(route).toMatch(/<ComponentReference[^>]*:component="publishedComponent"/)
    expect(route).toMatch(/<ComingSoonPage[^>]*:component="component"/)
    expect(route).toMatch(/<SiteHeader mode="docs"/)
    expect(route).toMatch(/<DocumentFrame\s+:toc="toc"/)
    expect(comingSoon).toMatch(/即将推出/)
  })
})
