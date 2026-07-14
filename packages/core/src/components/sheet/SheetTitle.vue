<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogTitleProps } from 'reka-ui'

  import { DialogTitle } from 'reka-ui'
  import { sheetVariants } from './variants'

  interface Props extends DialogTitleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = sheetVariants()
</script>

<template>
  <DialogTitle
    v-bind="props"
    :class="slots.title({ class: props.class as never })"
    data-slot="sheet-title"
  >
    <slot />
  </DialogTitle>
</template>
