<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { SelectScrollUpButtonProps } from 'reka-ui'

  import { ChevronUp } from '@lucide/vue'
  import { SelectScrollUpButton, useForwardProps } from 'reka-ui'

  import { selectVariants } from './variants'

  interface Props extends SelectScrollUpButtonProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = selectVariants()
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwarded"
    :class="slots.scrollUpButton({ class: props.class as never })"
    data-slot="select-scroll-up-button"
  >
    <slot>
      <ChevronUp
        :class="slots.scrollUpButtonIcon()"
        aria-hidden="true"
        data-slot="select-scroll-up-button-icon"
      />
    </slot>
  </SelectScrollUpButton>
</template>
