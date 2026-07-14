<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { MessageVariants } from './variants'

  import { Primitive } from 'reka-ui'
  import { messageVariants } from './variants'

  interface Props extends PrimitiveProps {
    align?: MessageVariants['align']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    align: 'start',
    as: 'div'
  })
  const slots = messageVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.base({ align, class: props.class as never })"
    :data-align="align"
    data-slot="message"
  >
    <slot />
  </Primitive>
</template>
