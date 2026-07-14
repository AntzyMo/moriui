<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ChartConfig } from './context'
  import type { ChartVariants } from './variants'

  import { computed, useId } from 'vue'
  import ChartStyle from './ChartStyle.vue'
  import { chartVariants } from './variants'
  import { provideChartContext } from './context'

  interface Props {
    id?: HTMLAttributes['id']
    config: ChartConfig
    cursor?: ChartVariants['cursor']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    cursor: false
  })

  defineSlots<{
    default: (props: { id: string, config: ChartConfig }) => unknown
  }>()

  const chartId = `chart-${useId()}`
  const config = computed(() => props.config)
  const slots = computed(() => chartVariants({ cursor: props.cursor }))

  provideChartContext({
    id: chartId,
    config
  })
</script>

<template>
  <div
    :id="props.id"
    :class="slots.base({ class: props.class as never })"
    :data-cursor="props.cursor || undefined"
    :data-chart="chartId"
    data-slot="chart"
  >
    <slot :id="chartId" :config="config" />
    <ChartStyle :id="chartId" />
  </div>
</template>
