<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import { injectProgressRootContext } from 'reka-ui'

  import { progressVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const rootContext = injectProgressRootContext()
  const slots = progressVariants()

  const value = computed(() => rootContext.modelValue?.value ?? null)
  const max = computed(() => rootContext.max.value)
  const state = computed(() => rootContext.progressState.value)
  const percentage = computed(() => {
    if (value.value === null)
      return null

    return (value.value / max.value) * 100
  })
  const valueText = computed(() => percentage.value === null ? '' : `${Math.round(percentage.value)}%`)
</script>

<template>
  <span
    :class="slots.value({ class: props.class as never })"
    data-slot="progress-value"
  >
    <slot
      :max="max"
      :percentage="percentage"
      :state="state"
      :value="value"
    >
      {{ valueText }}
    </slot>
  </span>
</template>
