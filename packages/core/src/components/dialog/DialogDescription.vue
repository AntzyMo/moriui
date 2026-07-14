<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogDescriptionProps } from 'reka-ui'

  import { DialogDescription } from 'reka-ui'
  import { dialogVariants } from './variants'

  interface Props extends DialogDescriptionProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = dialogVariants()
</script>

<template>
  <DialogDescription
    v-bind="props"
    :class="slots.description({ class: props.class as never })"
    data-slot="dialog-description"
  >
    <slot />
  </DialogDescription>
</template>
