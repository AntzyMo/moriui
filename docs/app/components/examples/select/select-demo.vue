<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const fruit = shallowRef<string>()
  const fruits = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '蓝莓', value: 'blueberry' },
    { label: '葡萄', value: 'grapes' },
    { label: '菠萝', value: 'pineapple' }
  ]
</script>

<template>
  <Select v-model="fruit">
    <SelectTrigger aria-label="水果" class="w-full max-w-48">
      <SelectValue placeholder="选择水果" />
    </SelectTrigger>
    <SelectContent>
      <SelectViewport>
        <SelectGroup>
          <SelectLabel>水果</SelectLabel>
          <SelectItem v-for="item in fruits" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
      </SelectViewport>
    </SelectContent>
  </Select>
</template>
