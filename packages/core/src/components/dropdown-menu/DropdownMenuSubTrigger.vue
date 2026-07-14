<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuSubTriggerProps } from 'reka-ui'

  import { ChevronRight } from '@lucide/vue'
  import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'

  interface Props extends DropdownMenuSubTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const forwarded = useForwardProps(props)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwarded"
    :class="slots.subTrigger({ class: props.class as never })"
    data-slot="dropdown-menu-sub-trigger"
  >
    <slot />
    <slot name="indicator">
      <ChevronRight
        :class="slots.subTriggerIcon()"
        aria-hidden="true"
        data-slot="dropdown-menu-sub-trigger-icon"
      />
    </slot>
  </DropdownMenuSubTrigger>
</template>
