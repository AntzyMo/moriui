import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import AspectRatio from '../src/components/aspect-ratio/AspectRatio.vue'

it('默认以 1:1 比例渲染比例盒与内容节点', () => {
  const page = render(AspectRatio, {
    slots: { default: '正方形内容' }
  })
  const wrapper = page.container.querySelector('[data-reka-aspect-ratio-wrapper]') as HTMLElement
  const content = page.container.querySelector('[data-slot="aspect-ratio"]') as HTMLElement

  expect(wrapper).not.toBeNull()
  expect(wrapper.style.position).toBe('relative')
  expect(wrapper.style.width).toBe('100%')
  expect(wrapper.style.paddingBottom).toBe('100%')
  expect(content).not.toBeNull()
  expect(content.style.position).toBe('absolute')
  expect(content.style.inset).toBe('0px')
  expect(content.textContent).toBe('正方形内容')
})

it.each([
  [16 / 9, '56.25%'],
  [9 / 16, '177.778%']
] as const)('将比例 %s 转换为 %s 占位高度', (ratio, expectedPadding) => {
  const page = render(AspectRatio, { props: { ratio } })
  const wrapper = page.container.querySelector('[data-reka-aspect-ratio-wrapper]') as HTMLElement

  expect(Number.parseFloat(wrapper.style.paddingBottom)).toBeCloseTo(
    Number.parseFloat(expectedPadding),
    3
  )
})

it('透传插槽参数、属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AspectRatio,
        {
          'aria-label': '视频预览',
          'class': 'custom-aspect-ratio',
          'data-testid': 'media-preview',
          'onClick': onClick,
          'ratio': 16 / 9
        },
        {
          default: ({ aspect }: { aspect: number }) =>
            h('span', { 'data-aspect': aspect }, '预览内容')
        }
      )
  })
  const page = render(Fixture)
  const content = page.container.querySelector('[data-slot="aspect-ratio"]') as HTMLElement
  const slotContent = content.querySelector('[data-aspect]') as HTMLElement

  expect(content.classList).toContain('custom-aspect-ratio')
  expect(content.getAttribute('aria-label')).toBe('视频预览')
  expect(content.dataset.testid).toBe('media-preview')
  expect(slotContent.dataset.aspect).toBe('56.25')

  content.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('支持 as 与 asChild 多态渲染，并保留稳定槽位', () => {
  const asSection = render(AspectRatio, {
    attrs: { 'aria-label': '媒体区域' },
    props: { as: 'section' },
    slots: { default: '媒体内容' }
  })
  const section = asSection.container.querySelector('section')

  expect(section?.dataset.slot).toBe('aspect-ratio')
  expect(section?.getAttribute('aria-label')).toBe('媒体区域')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        AspectRatio,
        { asChild: true },
        {
          default: () => h('a', { href: '#media' }, '查看媒体')
        }
      )
  })
  const asChild = render(AsChildFixture)
  const link = asChild.container.querySelector('a')

  expect(link?.dataset.slot).toBe('aspect-ratio')
  expect(link?.getAttribute('href')).toBe('#media')
  expect(link?.style.position).toBe('absolute')
})
