<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogTriggerProps } from 'reka-ui'

  import { DialogTrigger } from 'reka-ui'
  import { sheetVariants } from './variants'

  interface Props extends DialogTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = sheetVariants()
</script>

<template>
  <DialogTrigger
    v-bind="props"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="sheet-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
