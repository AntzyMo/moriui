<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { PrimitiveProps } from 'reka-ui'

  import { drawerVariants } from './variants'
  import { Primitive, useForwardProps } from 'reka-ui'

  interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), { as: 'div' })
  const forwarded = useForwardProps(props)
  const slots = drawerVariants()
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="slots.footer({ class: props.class as never })"
    data-slot="drawer-footer"
  >
    <slot />
  </Primitive>
</template>
