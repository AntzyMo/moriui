<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxAnchorProps } from 'reka-ui'

  import { comboboxVariants } from './variants'
  import { ComboboxAnchor, useForwardProps } from 'reka-ui'

  interface Props extends ComboboxAnchorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxAnchor
    v-bind="forwarded"
    :class="slots.anchor({ class: props.class as never })"
    data-slot="combobox-anchor"
  >
    <slot />
  </ComboboxAnchor>
</template>
