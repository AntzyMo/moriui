<script setup lang="ts">
  import type { DialogPortalProps } from 'reka-ui'

  import { DialogPortal } from 'reka-ui'

  const props = defineProps<DialogPortalProps>()
</script>

<template>
  <DialogPortal v-bind="props" data-slot="dialog-portal">
    <slot />
  </DialogPortal>
</template>
