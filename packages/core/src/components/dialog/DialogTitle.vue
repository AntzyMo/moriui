<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogTitleProps } from 'reka-ui'

  import { DialogTitle } from 'reka-ui'
  import { dialogVariants } from './variants'

  interface Props extends DialogTitleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = dialogVariants()
</script>

<template>
  <DialogTitle
    v-bind="props"
    :class="slots.title({ class: props.class as never })"
    data-slot="dialog-title"
  >
    <slot />
  </DialogTitle>
</template>
