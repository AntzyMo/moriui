<script setup lang="ts">
  import type { ProgressIndicatorProps } from 'reka-ui'
  import type { CSSProperties, HTMLAttributes } from 'vue'

  import { computed } from 'vue'
  import {
    ProgressIndicator,
    injectProgressRootContext,
    useForwardProps
  } from 'reka-ui'

  import { progressVariants } from './variants'

  interface Props extends ProgressIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const rootContext = injectProgressRootContext()
  const slots = progressVariants()

  const percentage = computed(() => {
    const value = rootContext.modelValue?.value

    if (value === null || value === undefined)
      return null

    return (value / rootContext.max.value) * 100
  })
  const indicatorStyle = computed<CSSProperties>(() => {
    if (percentage.value === null)
      return {}

    return { transform: `translateX(-${100 - percentage.value}%)` }
  })
</script>

<template>
  <ProgressIndicator
    v-bind="forwarded"
    :class="slots.indicator({ class: props.class as never })"
    :style="indicatorStyle"
    data-slot="progress-indicator"
  >
    <slot />
  </ProgressIndicator>
</template>
