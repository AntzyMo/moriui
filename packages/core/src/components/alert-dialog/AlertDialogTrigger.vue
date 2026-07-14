<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogTriggerProps } from 'reka-ui'

  import { AlertDialogTrigger } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogTrigger
    v-bind="props"
    :class="alertDialogVariants().trigger({ class: props.class as never })"
    data-slot="alert-dialog-trigger"
  >
    <slot />
  </AlertDialogTrigger>
</template>
