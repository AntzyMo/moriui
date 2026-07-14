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
    :class="slots.separator({ class: props.class as never })"
    data-slot="input-otp-separator"
    role="separator"
  >
    <slot>
      <span
        :class="slots.separatorMark()"
        aria-hidden="true"
        data-slot="input-otp-separator-mark"
      />
    </slot>
  </div>
</template>
