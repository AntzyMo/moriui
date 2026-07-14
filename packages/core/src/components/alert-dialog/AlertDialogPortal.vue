<script setup lang="ts">
  import type { AlertDialogPortalProps } from 'reka-ui'

  import { AlertDialogPortal } from 'reka-ui'

  const props = defineProps<AlertDialogPortalProps>()
</script>

<template>
  <AlertDialogPortal v-bind="props" data-slot="alert-dialog-portal">
    <slot />
  </AlertDialogPortal>
</template>
