<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ToggleGroupVariants } from './variants'
  import type { ToggleGroupItemProps as RekaToggleGroupItemProps } from 'reka-ui'

  import { computed, inject } from 'vue'
  import { ToggleGroupItem as RekaToggleGroupItem, useForwardProps } from 'reka-ui'

  import { toggleGroupVariants } from './variants'
  import { toggleGroupContextKey } from './context'

  export interface ToggleGroupItemProps extends RekaToggleGroupItemProps {
    variant?: ToggleGroupVariants['variant']
    size?: ToggleGroupVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = defineProps<ToggleGroupItemProps>()
  const forwarded = useForwardProps(props)
  const context = inject(toggleGroupContextKey)
  const slots = toggleGroupVariants()
  const variant = computed(() => props.variant ?? context?.variant.value ?? 'default')
  const size = computed(() => props.size ?? context?.size.value ?? 'default')
  const spacing = computed(() => context?.spacing.value ?? 2)
</script>

<template>
  <RekaToggleGroupItem
    v-slot="slotProps"
    v-bind="forwarded"
    :class="slots.item({ variant, size, class: props.class as never })"
    :data-size="size"
    :data-spacing="spacing"
    :data-variant="variant"
    data-slot="toggle-group-item"
  >
    <slot v-bind="slotProps" />
  </RekaToggleGroupItem>
</template>
