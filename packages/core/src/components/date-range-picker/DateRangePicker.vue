<script setup lang="ts">
  import type { DateRange, DateRangePickerRootEmits, DateRangePickerRootProps } from 'reka-ui'

  import { DateRangePickerRoot, useForwardPropsEmits } from 'reka-ui'

  interface Props extends Omit<DateRangePickerRootProps, 'modelValue'> {}
  type Emits = Omit<DateRangePickerRootEmits, 'update:modelValue'>

  const props = withDefaults(defineProps<Props>(), { closeOnSelect: true })
  const emit = defineEmits<Emits>()
  const modelValue = defineModel<DateRange>()
  const forwarded = useForwardPropsEmits(props, emit)
</script>

<template>
  <DateRangePickerRoot v-bind="forwarded" v-model="modelValue">
    <slot />
  </DateRangePickerRoot>
</template>
