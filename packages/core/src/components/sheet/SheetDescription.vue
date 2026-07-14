<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogDescriptionProps } from 'reka-ui'

  import { sheetVariants } from './variants'
  import { DialogDescription } from 'reka-ui'

  interface Props extends DialogDescriptionProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = sheetVariants()
</script>

<template>
  <DialogDescription
    v-bind="props"
    :class="slots.description({ class: props.class as never })"
    data-slot="sheet-description"
  >
    <slot />
  </DialogDescription>
</template>
