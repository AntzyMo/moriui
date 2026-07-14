<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ChartConfig, ChartDatum, ChartTooltipIndicator, ChartValue } from './context'

  import { computed } from 'vue'
  import { chartVariants } from './variants'

  interface Props {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: ChartTooltipIndicator
    labelKey?: string
    labelFormatter?: (value: ChartValue) => string
    payload?: ChartDatum
    config?: ChartConfig
    class?: HTMLAttributes['class']
    x?: ChartValue
  }

  interface TooltipItem {
    key: string
    label: string
    value: unknown
  }

  const props = withDefaults(defineProps<Props>(), {
    hideLabel: false,
    hideIndicator: false,
    indicator: 'dot',
    payload: () => ({}),
    config: () => ({})
  })

  const slots = computed(() => chartVariants())
  const items = computed<TooltipItem[]>(() => Object.entries(props.payload)
    .filter(([key]) => Boolean(props.config[key]))
    .map(([key, value]) => ({
      key,
      value,
      label: props.config[key]?.label ?? key
    })))
  const nestedLabel = computed(() => items.value.length === 1 && props.indicator !== 'dot')
  const tooltipLabel = computed(() => {
    if (props.hideLabel)
      return undefined
    if (props.labelFormatter && props.x !== undefined)
      return props.labelFormatter(props.x)
    if (props.labelKey)
      return props.config[props.labelKey]?.label ?? formatValue(props.payload[props.labelKey])
    return props.x === undefined ? undefined : formatValue(props.x)
  })

  function formatValue(value: unknown) {
    if (value === null || value === undefined)
      return ''
    if (typeof value === 'number' || value instanceof Date)
      return value.toLocaleString()
    return String(value)
  }
</script>

<template>
  <div :class="slots.tooltip({ class: props.class as never })" data-slot="chart-tooltip">
    <slot :items="items" :label="tooltipLabel">
      <div v-if="tooltipLabel && !nestedLabel" :class="slots.tooltipLabel()" data-slot="chart-tooltip-label">
        {{ tooltipLabel }}
      </div>
      <div :class="slots.tooltipList()" data-slot="chart-tooltip-list">
        <div
          v-for="item in items"
          :key="item.key"
          :class="slots.tooltipItem()"
          data-slot="chart-tooltip-item"
        >
          <span
            v-if="!hideIndicator"
            :class="slots.tooltipIndicator()"
            :data-indicator="indicator"
            :style="{ backgroundColor: `var(--color-${item.key})`, borderColor: `var(--color-${item.key})` }"
            data-slot="chart-tooltip-indicator"
          />
          <div :class="slots.tooltipMetadata()" data-slot="chart-tooltip-metadata">
            <span v-if="nestedLabel && tooltipLabel" :class="slots.tooltipLabel()" data-slot="chart-tooltip-label">
              {{ tooltipLabel }}
            </span>
            <span>{{ item.label }}</span>
          </div>
          <span :class="slots.tooltipValue()" data-slot="chart-tooltip-value">
            {{ formatValue(item.value) }}
          </span>
        </div>
      </div>
    </slot>
  </div>
</template>
