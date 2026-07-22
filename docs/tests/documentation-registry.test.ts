import { describe, expect, it } from 'vite-plus/test'

import { componentInventory, componentSlugs } from '../app/documentation/inventory'
import { componentGroups, componentRegistry, getComponent } from '../app/documentation/registry'
import { catalogToc, getContentToc } from '../app/documentation/toc'

describe('组件注册表', () => {
  it('为每个 inventory slug 提供完整目录元数据', () => {
    expect(componentRegistry).toHaveLength(componentInventory.length)
    expect(componentRegistry.map(component => component.slug)).toEqual(componentSlugs)

    for (const [group, slug, title, related] of componentInventory) {
      const component = getComponent(slug)

      expect(component).toMatchObject({
        slug,
        title,
        group,
        status: 'published',
        summary: `用于${title}场景的 MoriUI 组件。`,
        related
      })
      expect(component?.name).toBeTruthy()
      expect(component?.catalogPreview).toBeTruthy()
    }
  })

  it('所有关联组件都存在于注册表中', () => {
    for (const component of componentRegistry) {
      for (const relatedSlug of component.related)
        expect(getComponent(relatedSlug)).toBeDefined()
    }
  })

  it('按固定分组顺序组织目录和目录 TOC', () => {
    expect(componentGroups.map(group => group.title)).toEqual(['基础', '表单', '导航', '浮层', '数据与反馈'])
    expect(componentGroups.flatMap(group => group.items)).toEqual(componentRegistry)
    expect(catalogToc.map(item => item.id)).toEqual(componentGroups.map(group => group.title))
  })

  it('根据 Content 标题树生成详情目录，并忽略页面 H1、四级标题', () => {
    expect(getContentToc([
      { id: 'button', text: 'Button 操作按钮', depth: 1, children: [
        { id: '示例', text: '示例', depth: 2, children: [
          { id: '概览', text: '概览', depth: 3, children: [] },
          { id: '实现细节', text: '实现细节', depth: 4 }
        ] },
        { id: '变体', text: '变体', depth: 2, children: [] }
      ] },
      { id: 'api', text: 'API 参考', depth: 2, children: [
        { id: '属性', text: '属性', depth: 3 }
      ] }
    ])).toEqual([
      { id: '示例', label: '示例' },
      { id: '概览', label: '概览' },
      { id: '变体', label: '变体' },
      { id: 'api', label: 'API 参考' },
      { id: '属性', label: '属性' }
    ])
  })
})
