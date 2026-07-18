<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    RadioGroup,
    RadioGroupItem
  } from 'moriui'

  const density = shallowRef('comfortable')
  const options = [
    { value: 'default', label: 'افتراضي', description: 'تباعد قياسي لمعظم حالات الاستخدام.' },
    { value: 'comfortable', label: 'مريح', description: 'مساحة أكبر بين العناصر.' },
    { value: 'compact', label: 'مضغوط', description: 'تباعد أدنى للتخطيطات الكثيفة.' }
  ]
</script>

<template>
  <RadioGroup v-model="density" class="w-full max-w-xs" dir="rtl">
    <Field v-for="item in options" :key="item.value" orientation="horizontal">
      <RadioGroupItem :id="`rtl-density-${item.value}`" :value="item.value" />
      <FieldContent>
        <FieldLabel :for="`rtl-density-${item.value}`">
          {{ item.label }}
        </FieldLabel>
        <FieldDescription>{{ item.description }}</FieldDescription>
      </FieldContent>
    </Field>
  </RadioGroup>
</template>
