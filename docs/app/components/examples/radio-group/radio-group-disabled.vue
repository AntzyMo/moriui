<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, RadioGroup, RadioGroupItem } from 'moriui'

  const option = shallowRef('option-2')
</script>

<template>
  <RadioGroup v-model="option" class="w-fit">
    <Field orientation="horizontal" data-disabled>
      <RadioGroupItem id="disabled-option-1" value="option-1" disabled />
      <FieldLabel for="disabled-option-1">
        不可选选项
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="disabled-option-2" value="option-2" />
      <FieldLabel for="disabled-option-2">
        选项二
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="disabled-option-3" value="option-3" />
      <FieldLabel for="disabled-option-3">
        选项三
      </FieldLabel>
    </Field>
  </RadioGroup>
</template>
