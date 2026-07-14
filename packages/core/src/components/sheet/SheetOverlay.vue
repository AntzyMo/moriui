<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogOverlayProps } from 'reka-ui'

  import { DialogOverlay } from 'reka-ui'
  import { sheetVariants } from './variants'

  interface Props extends DialogOverlayProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = sheetVariants()
</script>

<template>
  <DialogOverlay
    v-bind="props"
    :class="slots.overlay({ class: props.class as never })"
    data-slot="sheet-overlay"
  />
</template>
