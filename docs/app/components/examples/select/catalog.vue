<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const theme = shallowRef('system')
</script>

<template>
  <Select v-model="theme">
    <SelectTrigger aria-label="主题" class="w-32" size="sm">
      <SelectValue placeholder="选择主题" />
    </SelectTrigger>
    <SelectContent>
      <SelectViewport>
        <SelectItem v-for="item in [['light', '浅色'], ['dark', '深色'], ['system', '跟随系统']]" :key="item[0]" :value="item[0]">
          <SelectItemIndicator /><SelectItemText>{{ item[1] }}</SelectItemText>
        </SelectItem>
      </SelectViewport>
    </SelectContent>
  </Select>
</template>
