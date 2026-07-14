<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogCloseProps } from 'reka-ui'

  import { DialogClose } from 'reka-ui'
  import { dialogVariants } from './variants'

  interface Props extends DialogCloseProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = dialogVariants()
</script>

<template>
  <DialogClose
    v-bind="props"
    :class="slots.close({ class: props.class as never })"
    data-slot="dialog-close"
  >
    <slot />
  </DialogClose>
</template>
