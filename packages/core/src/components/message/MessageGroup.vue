<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { messageVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div'
  })
  const slots = messageVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.group({ class: props.class as never })"
    data-slot="message-group"
  >
    <slot />
  </Primitive>
</template>
