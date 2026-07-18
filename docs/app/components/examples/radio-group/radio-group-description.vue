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
    { value: 'default', label: '默认', description: '适合大多数场景的标准间距。' },
    { value: 'comfortable', label: '舒适', description: '为内容保留更多呼吸空间。' },
    { value: 'compact', label: '紧凑', description: '适合信息密集的操作界面。' }
  ]
</script>

<template>
  <RadioGroup v-model="density" class="w-full max-w-xs">
    <Field v-for="item in options" :key="item.value" orientation="horizontal">
      <RadioGroupItem :id="`description-${item.value}`" :value="item.value" />
      <FieldContent>
        <FieldLabel :for="`description-${item.value}`">
          {{ item.label }}
        </FieldLabel>
        <FieldDescription>{{ item.description }}</FieldDescription>
      </FieldContent>
    </Field>
  </RadioGroup>
</template>
