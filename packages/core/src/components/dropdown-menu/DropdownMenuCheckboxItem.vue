<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui'

  import { dropdownMenuVariants } from './variants'
  import DropdownMenuItemIndicator from './DropdownMenuItemIndicator.vue'
  import { DropdownMenuCheckboxItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<DropdownMenuCheckboxItemProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  type Emits = Omit<DropdownMenuCheckboxItemEmits, 'update:modelValue'>

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<boolean | 'indeterminate'>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = dropdownMenuVariants()
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.checkboxItem({ class: props.class as never })"
    data-slot="dropdown-menu-checkbox-item"
  >
    <DropdownMenuItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="dropdown-menu-checkbox-item-mark"
        />
      </slot>
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
