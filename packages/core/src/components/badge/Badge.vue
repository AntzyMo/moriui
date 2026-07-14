<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'
  import type { BadgeVariants } from './variants'

  import { Primitive } from 'reka-ui'
  import { badgeVariants } from './variants'

  interface Props extends PrimitiveProps {
    variant?: BadgeVariants['variant']
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'span',
    variant: 'default'
  })
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="badgeVariants({ variant, class: props.class as never })"
    data-slot="badge"
  >
    <slot />
  </Primitive>
</template>
