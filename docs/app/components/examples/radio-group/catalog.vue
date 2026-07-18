<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, RadioGroup, RadioGroupItem } from 'moriui'

  const density = shallowRef('comfortable')
</script>

<template>
  <RadioGroup v-model="density" aria-label="界面密度" class="w-fit">
    <Field orientation="horizontal">
      <RadioGroupItem id="catalog-radio-comfortable" value="comfortable" />
      <FieldLabel for="catalog-radio-comfortable">
        舒适
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem id="catalog-radio-compact" value="compact" />
      <FieldLabel for="catalog-radio-compact">
        紧凑
      </FieldLabel>
    </Field>
  </RadioGroup>
</template>
