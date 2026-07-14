<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import { DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
  import DropdownMenuItemIndicator from './DropdownMenuItemIndicator.vue'

  interface Props extends DropdownMenuRadioItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<DropdownMenuRadioItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="slots.radioItem({ class: props.class as never })"
    data-slot="dropdown-menu-radio-item"
  >
    <DropdownMenuItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="dropdown-menu-radio-item-mark"
        />
      </slot>
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuRadioItem>
</template>
