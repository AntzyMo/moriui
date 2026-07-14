<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogCloseProps } from 'reka-ui'

  import { DialogClose } from 'reka-ui'
  import { sheetVariants } from './variants'

  interface Props extends DialogCloseProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = sheetVariants()
</script>

<template>
  <DialogClose
    v-bind="props"
    :class="slots.close({ class: props.class as never })"
    data-slot="sheet-close"
  >
    <slot />
  </DialogClose>
</template>
