<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogCancelProps } from 'reka-ui'

  import { AlertDialogCancel } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogCancelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogCancel
    v-bind="props"
    :class="alertDialogVariants().cancel({ class: props.class as never })"
    data-slot="alert-dialog-cancel"
  >
    <slot />
  </AlertDialogCancel>
</template>
