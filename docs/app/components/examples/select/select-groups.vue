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
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const food = shallowRef<string>()
  const fruits = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'blueberry', label: '蓝莓' }
  ]
  const vegetables = [
    { value: 'carrot', label: '胡萝卜' },
    { value: 'broccoli', label: '西兰花' },
    { value: 'spinach', label: '菠菜' }
  ]
</script>

<template>
  <Select v-model="food">
    <SelectTrigger aria-label="食材" class="w-full max-w-48">
      <SelectValue placeholder="选择食材" />
    </SelectTrigger>
    <SelectContent>
      <SelectViewport>
        <SelectGroup>
          <SelectLabel>水果</SelectLabel>
          <SelectItem v-for="item in fruits" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>蔬菜</SelectLabel>
          <SelectItem v-for="item in vegetables" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
      </SelectViewport>
    </SelectContent>
  </Select>
</template>
