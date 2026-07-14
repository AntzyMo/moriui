<script setup lang="ts" generic="Type extends InputOTPType = 'text'">
  import type { HTMLAttributes } from 'vue'
  import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'

  import { inputOTPVariants } from './variants'
  import { PinInputRoot, useForwardPropsEmits } from 'reka-ui'

  export type InputOTPType = 'text' | 'number'
  export type InputOTPValue<Type extends InputOTPType = 'text'> = [Type] extends ['number']
    ? number[]
    : string[]
  export interface InputOTPProps<Type extends InputOTPType = 'text'>
    extends Omit<PinInputRootProps<Type>, 'modelValue' | 'otp'> {
    /** 是否启用一次性验证码的自动填充与顺序输入行为。 */
    otp?: boolean
    class?: HTMLAttributes['class']
  }

  type Emits = Pick<PinInputRootEmits<Type>, 'complete'>

  const props = withDefaults(defineProps<InputOTPProps<Type>>(), {
    otp: true
  })
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<InputOTPValue<Type>>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = inputOTPVariants()
</script>

<template>
  <PinInputRoot
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.root({ class: props.class as never })"
    data-slot="input-otp"
  >
    <slot v-bind="slotProps" />
  </PinInputRoot>
</template>
