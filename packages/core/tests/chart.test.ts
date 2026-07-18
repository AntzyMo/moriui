import { expect, it } from 'vite-plus/test'
import type { ChartConfig } from '../src/components/chart/context'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import { chartVariants } from '../src/components/chart/variants'
import { componentToString } from '../src/components/chart/utils'
import ChartContainer from '../src/components/chart/ChartContainer.vue'
import ChartLegendContent from '../src/components/chart/ChartLegendContent.vue'
import ChartTooltipContent from '../src/components/chart/ChartTooltipContent.vue'

import './style.css'

const chartConfig = {
  desktop: {
    label: '桌面端',
    theme: { light: 'rgb(1, 2, 3)', dark: 'rgb(4, 5, 6)' }
  },
  mobile: {
    label: '移动端',
    color: 'rgb(7, 8, 9)'
  }
} satisfies ChartConfig

it('渲染 Chart 容器、作用域插槽与调用方属性', () => {
  const page = render(ChartContainer, {
    attrs: { 'aria-label': '访问趋势', 'data-testid': 'traffic-chart' },
    props: { class: 'custom-chart', config: chartConfig, cursor: true },
    slots: {
      default: ({ id, config }) =>
        h('div', { 'data-testid': 'chart-slot' }, `${id}:${Object.keys(config).join(',')}`)
    }
  })
  const chart = page.container.querySelector('[data-slot="chart"]') as HTMLElement
  const slot = page.container.querySelector('[data-testid="chart-slot"]') as HTMLElement

  expect(chart.classList).toContain('chart')
  expect(chart.classList).toContain('chart--cursor')
  expect(chart.classList).toContain('custom-chart')
  expect(chart.dataset.cursor).toBe('true')
  expect(chart.dataset.chart).toMatch(/^chart-/)
  expect(chart.getAttribute('aria-label')).toBe('访问趋势')
  expect(chart.dataset.testid).toBe('traffic-chart')
  expect(slot.textContent).toContain(chart.dataset.chart)
  expect(slot.textContent).toContain('desktop,mobile')
})

it('为每个实例生成隔离的浅色与深色配置色', () => {
  const page = render(ChartContainer, { props: { config: chartConfig } })
  const chart = page.container.querySelector('[data-slot="chart"]') as HTMLElement
  const style = page.container.querySelector('style') as HTMLStyleElement

  expect(style.textContent).toContain(`[data-chart='${chart.dataset.chart}']`)
  expect(style.textContent).toContain('[data-theme=\'dark\']')
  expect(style.textContent).toContain('--color-desktop: rgb(1, 2, 3);')
  expect(style.textContent).toContain('--color-desktop: rgb(4, 5, 6);')
  expect(style.textContent).toContain('--color-mobile: rgb(7, 8, 9);')
  expect(getComputedStyle(chart).getPropertyValue('--chart-aspect-ratio').trim()).toBe('16 / 9')

  chart.style.setProperty('--chart-aspect-ratio', '1 / 1')
  expect(getComputedStyle(chart).aspectRatio).toBe('1 / 1')
})

it('渲染 Tooltip 的标签、数据项和指示器', () => {
  const page = render(ChartTooltipContent, {
    props: {
      config: chartConfig,
      indicator: 'dashed',
      labelKey: 'monthLabel',
      payload: { monthLabel: '一月', desktop: 186, mobile: 80, ignored: 42 }
    }
  })

  const tooltip = page.container.querySelector('[data-slot="chart-tooltip"]') as HTMLElement
  const items = page.container.querySelectorAll('[data-slot="chart-tooltip-item"]')
  const indicator = page.container.querySelector(
    '[data-slot="chart-tooltip-indicator"]'
  ) as HTMLElement

  expect(tooltip.textContent).toContain('一月')
  expect(tooltip.textContent).toContain('桌面端')
  expect(tooltip.textContent).toContain('186')
  expect(tooltip.textContent).toContain('移动端')
  expect(tooltip.textContent).not.toContain('ignored')
  expect(items).toHaveLength(2)
  expect(indicator.dataset.indicator).toBe('dashed')
})

it('在 ChartContainer 内从上下文渲染 Legend', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        ChartContainer,
        { config: chartConfig },
        {
          default: () => h(ChartLegendContent, { verticalAlign: 'top' })
        }
      )
  })
  const page = render(Fixture)
  const legend = page.container.querySelector('[data-slot="chart-legend"]') as HTMLElement
  const indicators = page.container.querySelectorAll('[data-slot="chart-legend-indicator"]')

  expect(legend.dataset.verticalAlign).toBe('top')
  expect(legend.textContent).toContain('桌面端')
  expect(legend.textContent).toContain('移动端')
  expect(indicators).toHaveLength(2)
})

it('为 Unovis Tooltip 模板提供配置、数据与横轴值，并在服务端安全跳过', () => {
  const Content = defineComponent({
    props: {
      payload: { type: Object, required: true },
      config: { type: Object, required: true },
      x: { type: String, required: true }
    },
    setup: props => () =>
      h('span', `${Object.keys(props.config).join(',')}:${props.payload.desktop}:${props.x}`)
  })
  const template = componentToString(chartConfig, Content)

  expect(template?.({ data: { desktop: 186 } }, '一月')).toContain('desktop,mobile:186:一月')
  expect(componentToString(chartConfig, Content, undefined, null)).toBeUndefined()
})

it('为 Chart 各可见槽位提供稳定类名', () => {
  const slots = chartVariants({ cursor: true })

  expect(slots.base()).toContain('chart--cursor')
  expect(slots.tooltip()).toContain('chart__tooltip')
  expect(slots.tooltipIndicator()).toContain('chart__tooltip-indicator')
  expect(slots.legend()).toContain('chart__legend')
  expect(slots.legendIndicator()).toContain('chart__legend-indicator')
})
