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
    { value: 'apple', label: 'تفاح' },
    { value: 'banana', label: 'موز' },
    { value: 'blueberry', label: 'توت أزرق' }
  ]
  const vegetables = [
    { value: 'carrot', label: 'جزر' },
    { value: 'broccoli', label: 'بروكلي' },
    { value: 'spinach', label: 'سبانخ' }
  ]
</script>

<template>
  <Select v-model="food" dir="rtl">
    <SelectTrigger aria-label="الطعام" class="w-40">
      <SelectValue placeholder="اختر الطعام" />
    </SelectTrigger>
    <SelectContent dir="rtl">
      <SelectViewport>
        <SelectGroup>
          <SelectLabel>الفواكه</SelectLabel>
          <SelectItem v-for="item in fruits" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>الخضروات</SelectLabel>
          <SelectItem v-for="item in vegetables" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
      </SelectViewport>
    </SelectContent>
  </Select>
</template>
