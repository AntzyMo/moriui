<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PinInputInputProps } from 'reka-ui'

  import { inputOTPVariants } from './variants'
  import { PinInputInput, useForwardProps } from 'reka-ui'

  export interface InputOTPSlotProps extends PinInputInputProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<InputOTPSlotProps>()
  const forwarded = useForwardProps(props)
  const slots = inputOTPVariants()
</script>

<template>
  <PinInputInput
    v-bind="forwarded"
    :class="slots.slot({ class: props.class as never })"
    data-slot="input-otp-slot"
  />
</template>
