<script setup lang="ts" generic="T = boolean">
  import type { HTMLAttributes } from 'vue'
  import type { SwitchRootProps } from 'reka-ui'

  import { switchVariants } from './variants'
  import { SwitchRoot, SwitchThumb, useForwardProps } from 'reka-ui'

  export interface SwitchProps<T = boolean> extends Omit<SwitchRootProps<T>, 'modelValue'> {
    size?: 'sm' | 'default'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<SwitchProps<T>>(), { size: 'default' })
  const modelValue = defineModel<T | null>()
  const forwarded = useForwardProps(props)
  const slots = switchVariants()
</script>

<template>
  <SwitchRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ size, class: props.class as never })"
    :data-size="size"
    data-slot="switch"
  >
    <SwitchThumb
      :class="slots.thumb()"
      data-slot="switch-thumb"
    >
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
