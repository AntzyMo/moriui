import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

const previewUrl = new URL('../app/components/ComponentPreview.vue', import.meta.url)
const contentUrl = new URL('../content/docs/components/button.md', import.meta.url)

describe('MDC 组件示例预览', () => {
  it('只公开 name 属性并复用解析工具和示例面板', async () => {
    const source = await readFile(previewUrl, 'utf8')

    expect(source).toMatch(/name:\s*string/)
    expect(source).not.toMatch(/component:\s*string/)
    expect(source).toMatch(/resolveDocumentationExample\(props\.name\)/)
    expect(source).toMatch(/<ExamplePanel[^>]*:code="example\.code"/)
  })

  it('将 Button 的 15 个现有示例写为 MDC 引用', async () => {
    const content = await readFile(contentUrl, 'utf8')
    const names = [...content.matchAll(/::component-preview\{name="([^"]+)"\}/g)].map(match => match[1])

    expect(names).toEqual([
      'button-demo', 'button-size', 'button-default', 'button-outline', 'button-secondary',
      'button-ghost', 'button-destructive', 'button-link', 'button-icon', 'button-with-icon',
      'button-rounded', 'button-spinner', 'button-group-demo', 'button-render', 'button-rtl'
    ])
    expect(content).toContain('| 属性 | 类型 | 默认值 | 说明 |')
    expect(content).toContain('仅图标按钮必须提供 `aria-label`')
    expect(content).toContain('## 鼠标指针')
    expect(content).toContain('MoriUI 不覆盖可用按钮的默认鼠标指针')
    expect(content).toContain('## 语义链接')
    expect(content).toContain('不要把链接行为伪装成按钮事件')
    expect(content).toContain('## RTL')
    expect(content).toContain('inline-start/inline-end 图标会随 dir 保持自然顺序')
  })
})
