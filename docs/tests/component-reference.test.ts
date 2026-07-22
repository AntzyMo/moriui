import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

const catalogUrl = new URL('../app/components/ComponentCatalog.vue', import.meta.url)
const sidebarUrl = new URL('../app/site/DocumentSidebar.vue', import.meta.url)
const codeBlockUrl = new URL('../app/components/CodeBlock.vue', import.meta.url)
const examplePanelUrl = new URL('../app/components/ExamplePanel.vue', import.meta.url)
const componentRouteUrl = new URL('../app/pages/docs/components/[slug].vue', import.meta.url)
const componentRouteDecisionUrl = new URL('../app/documentation/component-route.ts', import.meta.url)
const documentArticleUrl = new URL('../app/site/DocumentArticle.vue', import.meta.url)
const nuxtConfigUrl = new URL('../nuxt.config.ts', import.meta.url)

describe('组件目录与 MDC 详情页', () => {
  it('仅通过注册表加载示例，避免 Nuxt 自动组件名冲突', async () => {
    const config = await readFile(nuxtConfigUrl, 'utf8')

    expect(config).toMatch(
      /components:\s*\[\s*\{[\s\S]*path:\s*['"]~\/components['"][\s\S]*ignore:\s*\[['"]examples\/\*\*['"]\]/
    )
  })

  it('在固定宽度目录中渲染注册表预览和链接', async () => {
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
    expect(catalog).toMatch(/<component\s+:is="item\.catalogPreview"/)
    expect(catalog).toMatch(/`\/docs\/components\/\$\{item\.slug\}`/)
    expect(sidebar).toMatch(
      /\.sort\(\(left, right\) => left\.name\.localeCompare\(right\.name, 'en'\)\)/
    )
  })

  it('组件详情仅查询并渲染 MDC 内容', async () => {
    const [route, routeDecision, documentArticle] = await Promise.all([
      readFile(componentRouteUrl, 'utf8'),
      readFile(componentRouteDecisionUrl, 'utf8'),
      readFile(documentArticleUrl, 'utf8')
    ])

    expect(route).toMatch(/queryCollection\(['"]content['"]\)\.path\(contentPath\)\.first\(\)/)
    expect(route).toMatch(/resolveComponentRoute\(/)
    expect(routeDecision).toMatch(/getContentToc\(options\.contentPage\.body\.toc\?\.links \?\? \[\]\)/)
    expect(route).toMatch(/<DocumentArticle>/)
    expect(route).toMatch(/<ContentRenderer[^>]*:value="routeDecision\.contentPage"/)
    expect(route).toMatch(/statusCode:\s*404/)
    expect(documentArticle).toMatch(/\[&>div>h1\]/)
    expect(documentArticle).toMatch(/\[&>div>h2\]/)
    expect(documentArticle).toMatch(/\[&>div>h3\]/)
    expect(documentArticle).toMatch(/\[&>div>p\]/)
    expect(documentArticle).toMatch(/\[&>div>pre\]/)
    expect(documentArticle).toMatch(/\[&>div>table\]:overflow-x-auto/)
  })

  it('缩小正文排版，但不影响示例预览内部的源码面板', async () => {
    const documentArticle = await readFile(documentArticleUrl, 'utf8')

    expect(documentArticle).toMatch(/\[&>div>h2_a\]:no-underline/)
    expect(documentArticle).toMatch(/\[&>div>h3_a\]:no-underline/)
    expect(documentArticle).toMatch(/\[&>div>p\]:text-sm/)
    expect(documentArticle).toMatch(/\[&>div>pre\]:text-sm/)
    expect(documentArticle).toMatch(/\[&>div>pre_code\]:text-xs/)
    expect(documentArticle).not.toMatch(/\[&_pre\]:text-sm/)
  })

  it('先渲染预览，再提供可复制且可展开的源码', async () => {
    const [panel, codeBlock] = await Promise.all([
      readFile(examplePanelUrl, 'utf8'),
      readFile(codeBlockUrl, 'utf8')
    ])
    const moriuiButtonImport = /import\s*\{\s*Button,\s*Tooltip[\s\S]*\}\s*from\s*['"]moriui['"]/

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
    expect(codeBlock).toMatch(/TooltipProvider/)
    expect(codeBlock).toMatch(/<TooltipProvider>/)
    expect(codeBlock).toMatch(/<\/TooltipProvider>/)
    expect(codeBlock).toMatch(
      /needsCollapse && !isExpanded \? 'max-h-27 overflow-hidden' : 'overflow-x-auto'/
    )
  })
})
