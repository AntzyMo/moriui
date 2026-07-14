import type { Component, InjectionKey, Ref } from 'vue'

import { inject, provide } from 'vue'

export const chartThemes = ['light', 'dark'] as const

export type ChartTheme = (typeof chartThemes)[number]
export type ChartValue = string | number | Date
export type ChartDatum = Record<string, unknown>
export type ChartTooltipIndicator = 'dot' | 'line' | 'dashed'
export type ChartTooltipTemplate = (data: ChartDatum | { data: ChartDatum }, x: ChartValue) => string

interface ChartConfigBase {
  label?: string
  icon?: Component
}

export type ChartConfigItem = ChartConfigBase & (
  | { color: string, theme?: never }
  | { color?: never, theme: Record<ChartTheme, string> }
)

export type ChartConfig = Record<string, ChartConfigItem>

export interface ChartContext {
  id: string
  config: Readonly<Ref<ChartConfig>>
}

export const chartContextKey: InjectionKey<ChartContext> = Symbol('chart-context')

export function provideChartContext(context: ChartContext) {
  provide(chartContextKey, context)
}

export function useChartContext() {
  const context = inject(chartContextKey)

  if (!context) {
    throw new Error('Chart 子组件必须在 ChartContainer 内使用。')
  }

  return context
}
