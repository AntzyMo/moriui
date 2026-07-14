<script setup lang="ts" generic="T = boolean">
  import type { HTMLAttributes } from 'vue'
  import type { CheckboxRootProps } from 'reka-ui'

  import { Check, Minus } from '@lucide/vue'
  import { CheckboxIndicator, CheckboxRoot, useForwardProps } from 'reka-ui'

  import { checkboxVariants } from './variants'

  export interface CheckboxProps<T = boolean> extends Omit<CheckboxRootProps<T>, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<CheckboxProps<T>>()
  const modelValue = defineModel<T | 'indeterminate'>()
  const forwarded = useForwardProps(props)
  const slots = checkboxVariants()
</script>

<template>
  <CheckboxRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="checkbox"
  >
    <CheckboxIndicator
      :class="slots.indicator()"
      data-slot="checkbox-indicator"
    >
      <slot v-bind="slotProps">
        <Check
          v-if="slotProps.state === true"
          :class="slots.indicatorMark()"
          aria-hidden="true"
          data-slot="checkbox-indicator-mark"
        />
        <Minus
          v-else
          :class="slots.indicatorMark()"
          aria-hidden="true"
          data-slot="checkbox-indicator-mark"
        />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
