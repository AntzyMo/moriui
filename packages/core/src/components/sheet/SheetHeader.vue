<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { sheetVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), { as: 'div' })
  const slots = sheetVariants()
</script>

<template>
  <Primitive
    v-bind="props"
    :class="slots.header({ class: props.class as never })"
    data-slot="sheet-header"
  >
    <slot />
  </Primitive>
</template>
