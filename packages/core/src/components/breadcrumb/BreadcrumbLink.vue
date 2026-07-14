<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { Primitive } from 'reka-ui'
  import { breadcrumbVariants } from './variants'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'a'
  })
  const slots = breadcrumbVariants()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="slots.link({ class: props.class as never })"
    data-slot="breadcrumb-link"
  >
    <slot />
  </Primitive>
</template>
