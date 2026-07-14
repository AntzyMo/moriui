<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ToggleGroupRootProps } from 'reka-ui'
  import type { ToggleGroupVariants } from './variants'

  import { computed, provide } from 'vue'
  import { ToggleGroupRoot, useForwardProps } from 'reka-ui'

  import { toggleGroupVariants } from './variants'
  import { toggleGroupContextKey } from './context'

  export interface ToggleGroupProps extends Omit<ToggleGroupRootProps, 'modelValue'> {
    variant?: ToggleGroupVariants['variant']
    size?: ToggleGroupVariants['size']
    spacing?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<ToggleGroupProps>(), {
    variant: 'default',
    size: 'default',
    spacing: 2,
    orientation: 'horizontal'
  })
  const modelValue = defineModel<ToggleGroupRootProps['modelValue']>()
  const forwarded = useForwardProps(props)
  const slots = toggleGroupVariants()
  const variant = computed(() => props.variant)
  const size = computed(() => props.size)
  const spacing = computed(() => props.spacing)
  const orientation = computed(() => props.orientation)
  const style = computed(() => ({ '--toggle-group-gap': String(spacing.value) }))

  provide(toggleGroupContextKey, { variant, size, spacing })
</script>

<template>
  <ToggleGroupRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ orientation, class: props.class as never })"
    :data-size="size"
    :data-spacing="spacing"
    :data-variant="variant"
    :data-orientation="orientation"
    :style="style"
    data-slot="toggle-group"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
