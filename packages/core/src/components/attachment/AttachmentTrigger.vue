<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { attachmentVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button'
  })
  const slots = attachmentVariants()
</script>

<template>
  <Primitive
    v-bind="props"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="attachment-trigger"
  >
    <slot />
  </Primitive>
</template>
