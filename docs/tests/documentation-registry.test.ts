import { describe, expect, it } from 'vite-plus/test'
import type { ComponentRecord, PublishedComponentRecord } from '../app/documentation/registry'

import { catalogToc, getReferenceToc } from '../app/documentation/toc'
import {
  assertPublishedReference,
  componentGroups,
  componentRegistry,
  getComponent
} from '../app/documentation/registry'

const expectedSlugs = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'attachment',
  'avatar',
  'badge',
  'breadcrumb',
  'bubble',
  'button',
  'button-group',
  'calendar',
  'card',
  'carousel',
  'chart',
  'checkbox',
  'collapsible',
  'combobox',
  'command',
  'context-menu',
  'date-picker',
  'date-range-picker',
  'dialog',
  'direction',
  'drawer',
  'dropdown-menu',
  'empty',
  'field',
  'hover-card',
  'input',
  'input-group',
  'input-otp',
  'item',
  'kbd',
  'label',
  'marker',
  'menubar',
  'message',
  'message-scroller',
  'navigation-menu',
  'pagination',
  'progress',
  'radio-group',
  'resizable',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'sonner',
  'spinner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toggle',
  'toggle-group',
  'tooltip',
  'typography'
]

const expectedBaseExamples: Record<string, readonly string[]> = {
  'aspect-ratio': [
    'aspect-ratio-demo',
    'aspect-ratio-square',
    'aspect-ratio-portrait',
    'aspect-ratio-rtl'
  ],
  'avatar': [
    'avatar-demo',
    'avatar-basic',
    'avatar-badge',
    'avatar-badge-icon',
    'avatar-group',
    'avatar-group-count',
    'avatar-group-count-icon',
    'avatar-size',
    'avatar-dropdown',
    'avatar-rtl'
  ],
  'badge': [
    'badge-demo',
    'badge-variants',
    'badge-icon',
    'badge-spinner',
    'badge-link',
    'badge-colors',
    'badge-rtl'
  ],
  'bubble': [
    'bubble-demo',
    'bubble-variants',
    'bubble-alignment',
    'bubble-group-demo',
    'bubble-link-button',
    'bubble-reactions',
    'bubble-collapsible',
    'bubble-tooltip'
  ],
  'card': ['card-demo', 'card-small', 'card-spacing', 'card-edge-to-edge', 'card-image', 'card-rtl'],
  'direction': ['card-rtl'],
  'empty': [
    'empty-demo',
    'empty-outline',
    'empty-background',
    'empty-avatar',
    'empty-avatar-group',
    'empty-input-group',
    'empty-rtl'
  ],
  'item': [
    'item-demo',
    'item-variant',
    'item-size',
    'item-icon',
    'item-avatar',
    'item-image',
    'item-group',
    'item-header',
    'item-link',
    'item-dropdown',
    'item-rtl'
  ],
  'kbd': ['kbd-demo', 'kbd-group', 'kbd-button', 'kbd-tooltip', 'kbd-input-group', 'kbd-rtl'],
  'marker': [
    'marker-demo',
    'marker-variants',
    'marker-status',
    'marker-separator',
    'marker-border',
    'marker-icon',
    'marker-link-button'
  ],
  'separator': [
    'separator-demo',
    'separator-vertical',
    'separator-menu',
    'separator-list',
    'separator-rtl'
  ],
  'skeleton': [
    'skeleton-demo',
    'skeleton-avatar',
    'skeleton-card',
    'skeleton-text',
    'skeleton-form',
    'skeleton-table',
    'skeleton-rtl'
  ],
  'typography': [
    'typography-demo',
    'typography-h1',
    'typography-h2',
    'typography-h3',
    'typography-h4',
    'typography-p',
    'typography-blockquote',
    'typography-table',
    'typography-list',
    'typography-inline-code',
    'typography-lead',
    'typography-large',
    'typography-small',
    'typography-muted',
    'typography-rtl'
  ]
}

const expectedControlExamples: Record<string, readonly string[]> = {
  'attachment': [
    'attachment-demo',
    'attachment-image',
    'attachment-states',
    'attachment-sizes',
    'attachment-group',
    'attachment-trigger'
  ],
  'button': [
    'button-demo',
    'button-size',
    'button-default',
    'button-outline',
    'button-secondary',
    'button-ghost',
    'button-destructive',
    'button-link',
    'button-icon',
    'button-with-icon',
    'button-rounded',
    'button-spinner',
    'button-group-demo',
    'button-render',
    'button-rtl'
  ],
  'button-group': [
    'button-group-demo',
    'button-group-orientation',
    'button-group-size',
    'button-group-nested',
    'button-group-separator',
    'button-group-split',
    'button-group-input',
    'button-group-input-group',
    'button-group-dropdown',
    'button-group-select',
    'button-group-popover',
    'button-group-rtl'
  ],
  'checkbox': [
    'checkbox-demo',
    'checkbox-invalid',
    'checkbox-basic',
    'checkbox-description',
    'checkbox-disabled',
    'checkbox-group',
    'checkbox-table',
    'checkbox-rtl'
  ],
  'combobox': [
    'combobox-demo',
    'combobox-basic',
    'combobox-multiple',
    'combobox-clear',
    'combobox-groups',
    'combobox-custom',
    'combobox-invalid',
    'combobox-disabled',
    'combobox-auto-highlight',
    'combobox-popup',
    'combobox-input-group',
    'combobox-rtl'
  ],
  'field': [
    'field-demo',
    'field-input',
    'field-textarea',
    'field-select',
    'field-slider',
    'field-fieldset',
    'field-checkbox',
    'field-radio',
    'field-switch',
    'field-choice-card',
    'field-group',
    'field-rtl',
    'field-responsive'
  ],
  'input': [
    'input-demo',
    'input-basic',
    'input-field',
    'input-fieldgroup',
    'input-disabled',
    'input-invalid',
    'input-file',
    'input-inline',
    'input-grid',
    'input-required',
    'input-badge',
    'input-input-group',
    'input-button-group',
    'input-form',
    'input-rtl'
  ],
  'input-group': [
    'input-group-demo',
    'input-group-inline-start',
    'input-group-inline-end',
    'input-group-block-start',
    'input-group-block-end',
    'input-group-icon',
    'input-group-text',
    'input-group-button',
    'input-group-kbd',
    'input-group-dropdown',
    'input-group-spinner',
    'input-group-textarea',
    'input-group-custom',
    'input-group-rtl'
  ],
  'input-otp': [
    'input-otp-demo',
    'input-otp-pattern',
    'input-otp-separator',
    'input-otp-disabled',
    'input-otp-controlled',
    'input-otp-invalid',
    'input-otp-four-digits',
    'input-otp-alphanumeric',
    'input-otp-form',
    'input-otp-rtl'
  ],
  'label': ['label-demo', 'label-rtl'],
  'radio-group': [
    'radio-group-demo',
    'radio-group-description',
    'radio-group-choice-card',
    'radio-group-fieldset',
    'radio-group-disabled',
    'radio-group-invalid',
    'radio-group-rtl'
  ],
  'select': [
    'select-demo',
    'select-align-item',
    'select-groups',
    'select-scrollable',
    'select-disabled',
    'select-invalid',
    'select-rtl'
  ],
  'slider': [
    'slider-demo',
    'slider-range',
    'slider-multiple',
    'slider-vertical',
    'slider-controlled',
    'slider-disabled',
    'slider-rtl'
  ],
  'switch': [
    'switch-demo',
    'switch-description',
    'switch-choice-card',
    'switch-disabled',
    'switch-invalid',
    'switch-sizes',
    'switch-rtl'
  ],
  'textarea': [
    'textarea-demo',
    'textarea-field',
    'textarea-disabled',
    'textarea-invalid',
    'textarea-button',
    'textarea-rtl'
  ],
  'toggle': [
    'toggle-demo',
    'toggle-outline',
    'toggle-text',
    'toggle-sizes',
    'toggle-disabled',
    'toggle-rtl'
  ],
  'toggle-group': [
    'toggle-group-demo',
    'toggle-group-outline',
    'toggle-group-sizes',
    'toggle-group-spacing',
    'toggle-group-vertical',
    'toggle-group-disabled',
    'toggle-group-font-weight-selector',
    'toggle-group-rtl'
  ]
}

describe('documentation registry', () => {
  it('is the unique inventory for all 60 core component domains', () => {
    expect(componentGroups.map(group => group.title)).toEqual([
      '基础',
      '表单',
      '导航',
      '浮层',
      '数据与反馈'
    ])
    expect(componentRegistry).toHaveLength(60)
    expect(new Set(componentRegistry.map(item => item.slug)).size).toBe(60)
    expect(componentRegistry.map(item => item.slug).sort()).toEqual(expectedSlugs)
    expect(componentGroups.flatMap(group => group.items)).toEqual(componentRegistry)
    expect(catalogToc.map(item => item.label)).toEqual(
      componentGroups.map(group => group.title)
    )
  })

  it('发布基础组件、表单输入与编组组件，并保留阶段外的 Dialog', () => {
    const published = componentRegistry.filter(item => item.status === 'published')

    expect(published.map(item => item.slug)).toEqual([
      'aspect-ratio',
      'avatar',
      'badge',
      'bubble',
      'card',
      'direction',
      'empty',
      'item',
      'kbd',
      'marker',
      'separator',
      'skeleton',
      'typography',
      'attachment',
      'button',
      'button-group',
      'checkbox',
      'combobox',
      'field',
      'input',
      'input-group',
      'input-otp',
      'label',
      'radio-group',
      'select',
      'slider',
      'switch',
      'textarea',
      'toggle',
      'toggle-group',
      'dialog'
    ])
    expect(
      published.every(item =>
        item.reference?.examples.every(example => example.code.length > 0)
      )
    ).toBe(true)
    expect(
      published.every(item => item.reference?.states.length && item.reference?.api.length)
    ).toBe(true)
    for (const record of published) {
      assertPublishedReference(record)
      expect(record.reference.examples.length).toBeGreaterThan(0)
      expect(record.reference.examples.every(example => example.preview)).toBe(true)
      expect(record.reference.api.length).toBeGreaterThan(0)
    }
    expect(getComponent('tabs')?.status).toBe('coming-soon')
    expect(
      getComponent('dialog')?.reference?.examples.map(example => example.shadcnExample)
    ).toEqual(['dialog-demo'])
    expect(getComponent('not-real')).toBeUndefined()
  })

  it('将基础与表单完整发布，并严格限制阶段外发布范围', () => {
    const phaseOne = componentRegistry.filter(item => ['基础', '表单'].includes(item.group))
    const later = componentRegistry.filter(item => !['基础', '表单'].includes(item.group))

    expect(phaseOne).toHaveLength(30)
    expect(phaseOne.every(item => item.status === 'published')).toBe(true)
    expect(later.filter(item => item.status === 'published').map(item => item.slug)).toEqual([
      'dialog'
    ])
    expect(
      later.filter(item => item.slug !== 'dialog').every(item => item.status === 'coming-soon')
    ).toBe(true)
  })

  it('发布全部表单组件并提供完整参考数据', () => {
    const form = componentRegistry.filter(item => item.group === '表单')

    expect(form).toHaveLength(17)
    expect(form.every(item => item.status === 'published')).toBe(true)
    expect(form.every(item => item.reference?.states.length && item.reference?.api.length)).toBe(
      true
    )
  })

  it('为表单输入与编组组件登记可预览的完整 Vue 示例源码', () => {
    const controls = [
      'attachment',
      'button',
      'button-group',
      'checkbox',
      'combobox',
      'field',
      'input',
      'input-group',
      'input-otp',
      'label',
      'radio-group',
      'select',
      'slider',
      'switch',
      'textarea',
      'toggle',
      'toggle-group'
    ]

    for (const slug of controls) {
      const record = getComponent(slug)!
      expect(record.reference?.examples.length).toBeGreaterThan(0)
      expect(
        record.reference?.examples.every(example => example.code.includes('<template>'))
      ).toBe(true)
      expect(
        record.reference?.examples.every(example =>
          [...example.code.matchAll(/from\s+['"]([^'"]+)['"]/g)].every(([, source]) =>
            ['moriui', 'vue', '@lucide/vue'].includes(source!)
          )
        )
      ).toBe(true)
      expect(record.reference?.examples.map(example => example.shadcnExample)).toEqual(
        expectedControlExamples[slug]
      )
      expect(record.catalogPreview).toBeTruthy()
    }
  })

  it('按固定顺序发布基础组件并关联同名 shadcn 文档', () => {
    const base = componentRegistry.filter(item => item.group === '基础')

    expect(base.map(item => item.slug)).toEqual([
      'aspect-ratio',
      'avatar',
      'badge',
      'bubble',
      'card',
      'direction',
      'empty',
      'item',
      'kbd',
      'marker',
      'separator',
      'skeleton',
      'typography'
    ])
    expect(
      base.every(item =>
        item.reference?.examples.every(example =>
          example.shadcnDoc.endsWith(`/components/base/${item.slug}.mdx`)
        )
      )
    ).toBe(true)
    expect(
      base.every(item =>
        item.reference?.examples.every(example =>
          example.code.startsWith('<script setup lang="ts">')
        )
      )
    ).toBe(true)
    for (const item of base) {
      expect(item.reference?.examples.map(example => example.shadcnExample)).toEqual(
        expectedBaseExamples[item.slug]
      )
    }
  })

  it('fails fast when a published record has no reference definition', () => {
    expect(() =>
      assertPublishedReference({
        slug: 'broken',
        title: '损坏组件',
        group: '基础',
        status: 'published',
        catalogPreview: componentRegistry[0]!.catalogPreview,
        summary: '测试记录。',
        related: []
      } as ComponentRecord)
    ).toThrow('已发布组件「broken」缺少参考资料')
  })

  it('根据发布组件的章节资料生成详情目录', () => {
    expect(
      getReferenceToc(getComponent('button') as PublishedComponentRecord).map(item => item.id)
    ).toContain('API-参考')
    expect(
      getReferenceToc(getComponent('button') as PublishedComponentRecord).map(item => item.id)
    ).toEqual([
      '导入',
      '示例',
      'API-参考'
    ])
  })

  it('使状态说明与 shadcn 的来源标题逐项对应', () => {
    const button = getComponent('button') as PublishedComponentRecord
    const input = getComponent('input') as PublishedComponentRecord

    expect(
      button.reference.states.map(state => ({
        id: state.id,
        title: state.title,
        shadcnHeading: state.shadcnHeading
      }))
    ).toEqual([
      { id: '鼠标指针', title: '鼠标指针', shadcnHeading: 'Cursor' },
      { id: '语义链接', title: '语义链接', shadcnHeading: 'As Link' },
      { id: 'RTL', title: 'RTL', shadcnHeading: 'RTL' }
    ])
    expect(button.reference.states[0]?.description).toContain('不覆盖')
    expect(
      input.reference.states.map(state => ({
        id: state.id,
        title: state.title,
        shadcnHeading: state.shadcnHeading
      }))
    ).toEqual([
      { id: '基础输入', title: '基础输入', shadcnHeading: 'Basic' },
      { id: '禁用状态', title: '禁用状态', shadcnHeading: 'Disabled' },
      { id: '无效状态', title: '无效状态', shadcnHeading: 'Invalid' },
      { id: '必填状态', title: '必填状态', shadcnHeading: 'Required' },
      { id: 'RTL', title: 'RTL', shadcnHeading: 'RTL' }
    ])
    expect(
      input.reference.states.find(state => state.shadcnHeading === 'Disabled')?.description
    ).toContain('disabled')
    expect(
      input.reference.states.find(state => state.shadcnHeading === 'Invalid')?.description
    ).toContain('aria-invalid')
    expect(
      input.reference.states.find(state => state.shadcnHeading === 'Required')?.description
    ).toContain('required')
  })
})
