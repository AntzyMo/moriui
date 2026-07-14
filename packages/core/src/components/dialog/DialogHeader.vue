<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { dialogVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), { as: 'div' })
  const slots = dialogVariants()
</script>

<template>
  <Primitive
    v-bind="props"
    :class="slots.header({ class: props.class as never })"
    data-slot="dialog-header"
  >
    <slot />
  </Primitive>
</template>
