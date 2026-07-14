<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { MenubarRadioItemEmits, MenubarRadioItemProps } from 'reka-ui'

  import { menubarVariants } from './variants'
  import MenubarItemIndicator from './MenubarItemIndicator.vue'
  import { MenubarRadioItem, useForwardPropsEmits } from 'reka-ui'

  interface Props extends MenubarRadioItemProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  const emit = defineEmits<MenubarRadioItemEmits>()
  const forwarded = useForwardPropsEmits(props, emit)
  const slots = menubarVariants()
</script>

<template>
  <MenubarRadioItem
    v-bind="forwarded"
    :class="slots.radioItem({ class: props.class as never })"
    data-slot="menubar-radio-item"
  >
    <MenubarItemIndicator>
      <slot name="indicator">
        <span
          :class="slots.itemIndicatorMark()"
          aria-hidden="true"
          data-slot="menubar-radio-item-mark"
        />
      </slot>
    </MenubarItemIndicator>
    <slot />
  </MenubarRadioItem>
</template>
