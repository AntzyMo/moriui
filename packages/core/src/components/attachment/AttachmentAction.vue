<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { ButtonVariants } from '../button/variants'

  import Button from '../button/Button.vue'
  import { attachmentVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    disabled?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
    size: 'icon-xs'
  })
  const slots = attachmentVariants()
</script>

<template>
  <Button
    v-bind="props"
    :class="slots.action({ class: props.class as never })"
    data-slot="attachment-action"
  >
    <slot />
  </Button>
</template>
