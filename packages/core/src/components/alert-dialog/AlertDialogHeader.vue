<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { alertDialogVariants } from './variants'

  interface Props extends PrimitiveProps { class?: HTMLAttributes['class'] }
  const props = withDefaults(defineProps<Props>(), { as: 'div' })
</script>

<template>
  <Primitive v-bind="props" :class="alertDialogVariants().header({ class: props.class as never })" data-slot="alert-dialog-header">
    <slot />
  </Primitive>
</template>
