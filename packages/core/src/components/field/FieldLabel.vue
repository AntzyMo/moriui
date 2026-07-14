<script setup lang="ts">
  import type { LabelProps } from '../label'

  import { Label } from '../label'
  import { useForwardProps } from 'reka-ui'
  import { fieldVariants } from './variants'

  interface Props extends LabelProps {}

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = fieldVariants()
</script>

<template>
  <Label
    v-bind="forwarded"
    :class="slots.label({ class: props.class as never })"
    data-slot="field-label"
  >
    <slot />
  </Label>
</template>
