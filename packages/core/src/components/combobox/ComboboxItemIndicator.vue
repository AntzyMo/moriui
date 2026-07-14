<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxItemIndicatorProps } from 'reka-ui'

  import { Check } from '@lucide/vue'
  import { ComboboxItemIndicator, useForwardProps } from 'reka-ui'

  import { comboboxVariants } from './variants'

  interface Props extends ComboboxItemIndicatorProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxItemIndicator
    v-bind="forwarded"
    :class="slots.itemIndicator({ class: props.class as never })"
    data-slot="combobox-item-indicator"
  >
    <slot>
      <Check
        :class="slots.itemIndicatorMark()"
        aria-hidden="true"
        data-slot="combobox-item-indicator-mark"
      />
    </slot>
  </ComboboxItemIndicator>
</template>
