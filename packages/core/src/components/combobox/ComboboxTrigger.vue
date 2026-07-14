<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ComboboxTriggerProps } from 'reka-ui'

  import { ChevronDown } from '@lucide/vue'
  import { ComboboxTrigger, useForwardProps } from 'reka-ui'

  import { comboboxVariants } from './variants'

  interface Props extends ComboboxTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = comboboxVariants()
</script>

<template>
  <ComboboxTrigger
    v-bind="forwarded"
    :class="slots.trigger({ class: props.class as never })"
    data-slot="combobox-trigger"
  >
    <slot>
      <ChevronDown
        :class="slots.triggerIcon()"
        aria-hidden="true"
        data-slot="combobox-trigger-icon"
      />
    </slot>
  </ComboboxTrigger>
</template>
