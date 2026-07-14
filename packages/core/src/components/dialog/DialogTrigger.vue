<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DialogTriggerProps } from 'reka-ui'

  import { DialogTrigger } from 'reka-ui'
  import { dialogVariants } from './variants'

  interface Props extends DialogTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const slots = dialogVariants()
</script>

<template>
  <DialogTrigger
    v-bind="props"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="dialog-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
