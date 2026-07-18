<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldDescription,
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

  const department = shallowRef<string>()
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="department">
      部门
    </FieldLabel>
    <Select v-model="department">
      <SelectTrigger id="department" aria-label="部门">
        <SelectValue placeholder="选择部门" />
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          <SelectItem v-for="item in ['工程', '设计', '市场']" :key="item" :value="item">
            <SelectItemIndicator /><SelectItemText>{{ item }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </Select>
    <FieldDescription>选择你的工作部门。</FieldDescription>
  </Field>
</template>
