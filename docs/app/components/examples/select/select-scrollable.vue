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
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const timezone = shallowRef<string>()
  const regions = [
    { label: '亚洲', items: [{ value: 'shanghai', label: '上海' }, { value: 'tokyo', label: '东京' }, { value: 'seoul', label: '首尔' }, { value: 'singapore', label: '新加坡' }, { value: 'kolkata', label: '加尔各答' }] },
    { label: '欧洲', items: [{ value: 'london', label: '伦敦' }, { value: 'paris', label: '巴黎' }, { value: 'berlin', label: '柏林' }, { value: 'madrid', label: '马德里' }, { value: 'rome', label: '罗马' }] },
    { label: '美洲', items: [{ value: 'new-york', label: '纽约' }, { value: 'chicago', label: '芝加哥' }, { value: 'denver', label: '丹佛' }, { value: 'los-angeles', label: '洛杉矶' }, { value: 'sao-paulo', label: '圣保罗' }] }
  ]
</script>

<template>
  <Select v-model="timezone">
    <SelectTrigger aria-label="时区" class="w-full max-w-64">
      <SelectValue placeholder="选择时区" />
    </SelectTrigger>
    <SelectContent>
      <SelectScrollUpButton />
      <SelectViewport>
        <SelectGroup v-for="region in regions" :key="region.label">
          <SelectLabel>{{ region.label }}</SelectLabel>
          <SelectItem v-for="item in region.items" :key="item.value" :value="item.value">
            <SelectItemIndicator /><SelectItemText>{{ item.label }}</SelectItemText>
          </SelectItem>
        </SelectGroup>
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </Select>
</template>
