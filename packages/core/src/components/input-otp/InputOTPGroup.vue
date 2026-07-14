<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import { inputOTPVariants } from './variants'

  interface Props {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = inputOTPVariants()
</script>

<template>
  <div
    :class="slots.group({ class: props.class as never })"
    data-slot="input-otp-group"
  >
    <slot />
  </div>
</template>
