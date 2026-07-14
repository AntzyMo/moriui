<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import { chartVariants } from './variants'
  import { useChartContext } from './context'

  interface Props {
    hideIcon?: boolean
    verticalAlign?: 'top' | 'bottom'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    hideIcon: false,
    verticalAlign: 'bottom'
  })

  const { config } = useChartContext()
  const slots = computed(() => chartVariants())
  const items = computed(() => Object.entries(config.value).map(([key, item]) => ({
    key,
    icon: item.icon,
    label: item.label ?? key
  })))
</script>

<template>
  <div :class="slots.legend({ class: props.class as never })" :data-vertical-align="verticalAlign" data-slot="chart-legend">
    <div
      v-for="item in items"
      :key="item.key"
      :class="slots.legendItem()"
      data-slot="chart-legend-item"
    >
      <component :is="item.icon" v-if="item.icon && !hideIcon" aria-hidden="true" />
      <span
        v-else-if="!hideIcon"
        :class="slots.legendIndicator()"
        :style="{ backgroundColor: `var(--color-${item.key})` }"
        data-slot="chart-legend-indicator"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
