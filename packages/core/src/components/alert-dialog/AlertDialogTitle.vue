<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { AlertDialogTitleProps } from 'reka-ui'

  import { AlertDialogTitle } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends AlertDialogTitleProps { class?: HTMLAttributes['class'] }
  const props = defineProps<Props>()
</script>

<template>
  <AlertDialogTitle v-bind="props" :class="alertDialogVariants().title({ class: props.class as never })" data-slot="alert-dialog-title">
    <slot />
  </AlertDialogTitle>
</template>
