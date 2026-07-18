<script setup lang="ts">
  import type { AcceptableValue, DropdownMenuRadioGroupEmits, DropdownMenuRadioGroupProps } from 'reka-ui'

  import { DropdownMenuRadioGroup, useForwardPropsEmits } from 'reka-ui'

  const props = defineProps<DropdownMenuRadioGroupProps>()
  const emit = defineEmits<DropdownMenuRadioGroupEmits>()
  const modelValue = defineModel<AcceptableValue>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DropdownMenuRadioGroup
    v-slot="slotProps"
    v-bind="forwarded"
    v-model="modelValue"
    data-slot="dropdown-menu-radio-group"
  >
    <slot v-bind="slotProps" />
  </DropdownMenuRadioGroup>
</template>
