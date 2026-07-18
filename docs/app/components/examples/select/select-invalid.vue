<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldError,
    FieldLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const fruit = shallowRef<string>()
</script>

<template>
  <Field class="w-full max-w-48" data-invalid>
    <FieldLabel for="invalid-fruit">
      水果
    </FieldLabel>
    <Select v-model="fruit">
      <SelectTrigger id="invalid-fruit" aria-invalid="true">
        <SelectValue placeholder="选择水果" />
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          <SelectItem v-for="item in [['apple', '苹果'], ['banana', '香蕉'], ['blueberry', '蓝莓']]" :key="item[0]" :value="item[0]">
            <SelectItemIndicator /><SelectItemText>{{ item[1] }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </Select>
    <FieldError>请选择一种水果。</FieldError>
  </Field>
</template>
