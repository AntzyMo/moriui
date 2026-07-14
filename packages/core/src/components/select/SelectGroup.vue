<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectGroupProps } from 'reka-ui'

  import { selectVariants } from './variants'
  import { SelectGroup, useForwardProps } from 'reka-ui'

  interface Props extends SelectGroupProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectGroup
    v-bind="forwarded"
    :class="slots.group({ class: props.class as never })"
    data-slot="select-group"
  >
    <slot />
  </SelectGroup>
</template>
