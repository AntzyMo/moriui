<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogOverlayProps } from 'reka-ui'

  import { AlertDialogOverlay } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogOverlayProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogOverlay
    v-bind="props"
    :class="alertDialogVariants().overlay({ class: props.class as never })"
    data-slot="alert-dialog-overlay"
  />
</template>
