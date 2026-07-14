<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxCancelProps } from 'reka-ui'

  import { X } from '@lucide/vue'
  import { ComboboxCancel, useForwardProps } from 'reka-ui'

  import { comboboxVariants } from './variants'

  interface Props extends ComboboxCancelProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxCancel
    v-bind="forwarded"
    :class="slots.cancel({ class: props.class as never })"
    aria-label="清空输入"
    data-slot="combobox-cancel"
  >
    <slot>
      <X
        :class="slots.cancelIcon()"
        aria-hidden="true"
        data-slot="combobox-cancel-icon"
      />
    </slot>
  </ComboboxCancel>
</template>
