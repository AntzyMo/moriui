<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ToggleVariants } from './variants'
  import type { ToggleProps as RekaToggleProps } from 'reka-ui'

  import { toggleVariants } from './variants'
  import { Toggle as RekaToggle, useForwardProps } from 'reka-ui'

  export interface ToggleProps extends Omit<RekaToggleProps, 'modelValue'> {
    variant?: ToggleVariants['variant']
    size?: ToggleVariants['size']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<ToggleProps>(), {
    variant: 'default',
    size: 'default'
  })
  const modelValue = defineModel<boolean | null>()
  const forwarded = useForwardProps(props)
  const slots = toggleVariants()
</script>

<template>
  <RekaToggle
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ variant, size, class: props.class as never })"
    :data-size="size"
    data-slot="toggle"
  >
    <slot v-bind="slotProps" />
  </RekaToggle>
</template>
