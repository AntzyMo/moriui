<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogDescriptionProps } from 'reka-ui'

  import { AlertDialogDescription } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogDescriptionProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogDescription v-bind="props" :class="alertDialogVariants().description({ class: props.class as never })" data-slot="alert-dialog-description">
    <slot />
  </AlertDialogDescription>
</template>
