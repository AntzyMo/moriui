<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import MenubarItemIndicator from './MenubarItemIndicator.vue'
  import { MenubarCheckboxItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<MenubarCheckboxItemProps, 'modelValue'> {
    class?: HTMLAttributes['class']
  }

  type Emits = Omit<MenubarCheckboxItemEmits, 'update:modelValue'>

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<boolean | 'indeterminate'>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = menubarVariants()
</script>

<template>
  <MenubarCheckboxItem
    v-bind="forwarded"
    v-model="modelValue"
    :class="slots.checkboxItem({ class: props.class as never })"
    data-slot="menubar-checkbox-item"
  >
    <MenubarItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="menubar-checkbox-item-mark"
        />
      </slot>
    </MenubarItemIndicator>
    <slot />
  </MenubarCheckboxItem>
</template>
