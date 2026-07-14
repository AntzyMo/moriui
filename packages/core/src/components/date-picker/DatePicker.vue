<script setup lang="ts">
  import type { DatePickerRootEmits, DatePickerRootProps, DateValue } from 'reka-ui'

  import { DatePickerRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<DatePickerRootProps, 'modelValue'> {}

  type Emits = Omit<DatePickerRootEmits, 'update:modelValue'>

  const props = withDefaults(defineProps<Props>(), { closeOnSelect: true })
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<DateValue>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DatePickerRoot v-bind="forwarded" v-model="modelValue">
    <slot />
  </DatePickerRoot>
</template>
