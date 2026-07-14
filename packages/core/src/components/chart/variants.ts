import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants'

export const chartVariants = tv({
  slots: {
    base: 'chart',
    tooltip: 'chart__tooltip',
    tooltipLabel: 'chart__tooltip-label',
    tooltipList: 'chart__tooltip-list',
    tooltipItem: 'chart__tooltip-item',
    tooltipIndicator: 'chart__tooltip-indicator',
    tooltipMetadata: 'chart__tooltip-metadata',
    tooltipValue: 'chart__tooltip-value',
    legend: 'chart__legend',
    legendItem: 'chart__legend-item',
    legendIndicator: 'chart__legend-indicator'
  },
  variants: {
    cursor: {
      true: { base: 'chart--cursor' },
      false: {}
    }
  },
  defaultVariants: {
    cursor: false
  }
})

export type ChartVariants = VariantProps<typeof chartVariants>
