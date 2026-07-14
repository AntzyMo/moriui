<script setup lang="ts">
  import type { AcceptableValue, MenubarRadioGroupEmits, MenubarRadioGroupProps } from 'reka-ui'

  import { MenubarRadioGroup, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<MenubarRadioGroupProps>()
  const emit = defineEmits<MenubarRadioGroupEmits>()
  const modelValue = defineModel<AcceptableValue>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <MenubarRadioGroup
    #default="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    data-slot="menubar-radio-group"
  >
    <slot v-bind="slotProps" />
  </MenubarRadioGroup>
</template>
