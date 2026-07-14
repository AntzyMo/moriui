<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogActionProps } from 'reka-ui'

  import { AlertDialogAction } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogActionProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogAction
    v-bind="props"
    :class="alertDialogVariants().action({ class: props.class as never })"
    data-slot="alert-dialog-action"
  >
    <slot />
  </AlertDialogAction>
</template>
