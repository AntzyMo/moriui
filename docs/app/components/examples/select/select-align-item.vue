<script setup lang="ts">
  import { computed, shallowRef } from 'vue'
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport,
    Switch
  } from 'moriui'

  const fruit = shallowRef('banana')
  const alignSelectedItem = shallowRef(true)
  const position = computed(() => alignSelectedItem.value ? 'item-aligned' as const : 'popper' as const)
  const fruits = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'blueberry', label: '蓝莓' },
    { value: 'grapes', label: '葡萄' }
  ]
</script>

<template>
  <FieldGroup class="w-full max-w-xs">
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel for="align-selected-item">
          对齐已选项
        </FieldLabel>
        <FieldDescription>关闭后改为相对触发器定位。</FieldDescription>
      </FieldContent>
      <Switch id="align-selected-item" v-model="alignSelectedItem" />
    </Field>
    <Field>
      <Select v-model="fruit">
        <SelectTrigger aria-label="水果">
          <SelectValue />
        </SelectTrigger>
        <SelectContent :position="position">
          <SelectViewport>
            <SelectItem v-for="item in fruits" :key="item.value" :value="item.value">
              <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>
    </Field>
  </FieldGroup>
</template>
