import { readdir, readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'
import { resolveDocumentationExample } from '../app/documentation/examples'
import { componentSlugs } from '../app/documentation/inventory'

const directory = new URL('../content/docs/components/', import.meta.url)

function countUnescapedPipes(value: string) {
  const characters = [...value]

  return characters.reduce((count, character, index) => {
    if (character !== '|')
      return count

    let precedingBackslashes = 0
    for (let cursor = index - 1; characters[cursor] === '\\'; cursor--)
      precedingBackslashes++

    return count + Number(precedingBackslashes % 2 === 0)
  }, 0)
}

function hasH2(source: string, heading: string) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`^## ${escapedHeading}$`, 'm').test(source)
}

function isApiDataRow(value: string) {
  return /^\|.*\|$/.test(value) && countUnescapedPipes(value.slice(1, -1)) === 3
}

describe('组件 MDC 内容完整性', () => {
  it('仅将未转义竖线和完整 H2 识别为结构', () => {
    expect(countUnescapedPipes('名称\\|别名 | 类型 | 默认值 | 说明')).toBe(3)
    expect(hasH2('前言中的 ## 示例 不是标题。', '示例')).toBe(false)
  })

  it('拒绝含有额外未转义竖线的 API 数据行', () => {
    expect(isApiDataRow('| 名称 | 类型 | 默认值 | 含有未转义 | 的说明 |')).toBe(false)
    expect(isApiDataRow('未用 <br> 表达的续行')).toBe(false)
  })

  it('为组件库存中的每个 slug 提供唯一的 MDC 文件', async () => {
    const files = (await readdir(directory))
      .filter(file => file.endsWith('.md'))
      .map(file => file.slice(0, -3))
      .sort()

    expect(files).toEqual([...componentSlugs].sort())
  })

  it('每份资料均保留完整的 MDC 结构，并可解析示例名称', async () => {
    for (const slug of componentSlugs) {
      const source = await readFile(new URL(`../content/docs/components/${slug}.md`, import.meta.url), 'utf8')
      const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/)
      const previewStarts = [...source.matchAll(/^::component-preview\{([^}]*)\}/gm)]
      const previews = [...source.matchAll(/^::component-preview\{(name="[^"]+")\}\n::$/gm)]
      const api = source.slice(source.indexOf('## API 参考'))
      const apiLines = api.split('\n')
      const apiHeaderIndex = apiLines.indexOf('| 属性 | 类型 | 默认值 | 说明 |')
      const apiRows = apiLines.slice(apiHeaderIndex + 2).filter(line => line.length > 0)

      expect(frontmatter).not.toBeNull()
      expect(frontmatter?.[1]).toMatch(/^title: \S.+$/m)
      expect(frontmatter?.[1]).toMatch(/^description: \S.+$/m)
      expect(hasH2(source, '导入')).toBe(true)
      expect(hasH2(source, '示例')).toBe(true)
      if (slug === 'button') {
        expect(hasH2(source, '鼠标指针')).toBe(true)
        expect(hasH2(source, '语义链接')).toBe(true)
        expect(hasH2(source, 'RTL 支持')).toBe(true)
      }
      else {
        expect(hasH2(source, '使用说明')).toBe(true)
      }
      expect(hasH2(source, '变体')).toBe(true)
      expect(hasH2(source, '可访问性')).toBe(true)
      expect(hasH2(source, 'API 参考')).toBe(true)
      expect(apiHeaderIndex).toBeGreaterThan(-1)
      expect(apiLines[apiHeaderIndex + 1]).toBe('| --- | --- | --- | --- |')
      expect(apiRows.length).toBeGreaterThan(0)
      expect(previews).toHaveLength(previewStarts.length)
      expect(previews.length).toBeGreaterThan(0)

      for (const row of apiRows) expect(isApiDataRow(row)).toBe(true)

      for (const [, attributes] of previews) {
        expect(attributes).toMatch(/^name="[^"]+"$/)
        const name = attributes!.slice(6, -1)
        expect(resolveDocumentationExample(name).code).toContain('<template>')
      }
    }
  })
})
