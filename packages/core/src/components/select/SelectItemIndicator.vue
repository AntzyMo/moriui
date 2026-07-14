<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectItemIndicatorProps } from 'reka-ui'

  import { Check } from '@lucide/vue'
  import { SelectItemIndicator, useForwardProps } from 'reka-ui'

  import { selectVariants } from './variants'

  interface Props extends SelectItemIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectItemIndicator
    v-bind="forwarded"
    :class="slots.itemIndicator({ class: props.class as never })"
    data-slot="select-item-indicator"
  >
    <slot>
      <Check
        :class="slots.itemIndicatorMark()"
        aria-hidden="true"
        data-slot="select-item-indicator-mark"
      />
    </slot>
  </SelectItemIndicator>
</template>
