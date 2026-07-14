<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectScrollDownButtonProps } from 'reka-ui'

  import { ChevronDown } from '@lucide/vue'
  import { SelectScrollDownButton, useForwardProps } from 'reka-ui'

  import { selectVariants } from './variants'

  interface Props extends SelectScrollDownButtonProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwarded"
    :class="slots.scrollDownButton({ class: props.class as never })"
    data-slot="select-scroll-down-button"
  >
    <slot>
      <ChevronDown
        :class="slots.scrollDownButtonIcon()"
        aria-hidden="true"
        data-slot="select-scroll-down-button-icon"
      />
    </slot>
  </SelectScrollDownButton>
</template>
