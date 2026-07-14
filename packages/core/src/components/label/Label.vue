<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { LabelProps as RekaLabelProps } from 'reka-ui'

  import { labelVariants } from './variants'
  import { Label, useForwardProps } from 'reka-ui'

  export interface LabelProps extends RekaLabelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<LabelProps>()
  const forwarded = useForwardProps(props)
</script>

<template>
  <Label
    v-bind="forwarded"
    :class="labelVariants({ class: props.class as never })"
    data-slot="label"
  >
    <slot />
  </Label>
</template>
