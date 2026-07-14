<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SeparatorProps } from 'reka-ui'

  import { separatorVariants } from './variants'
  import { Separator, useForwardProps } from 'reka-ui'

  interface Props extends SeparatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = separatorVariants()
</script>

<template>
  <Separator
    v-bind="forwarded"
    :class="slots.root({ class: props.class as never })"
    data-slot="separator"
  >
    <slot />
  </Separator>
</template>
