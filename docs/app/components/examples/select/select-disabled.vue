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

  const fruit = shallowRef('banana')
</script>

<template>
  <Select v-model="fruit" disabled>
    <SelectTrigger aria-label="水果" class="w-full max-w-48">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectViewport>
        <SelectItem v-for="item in [['apple', '苹果'], ['banana', '香蕉'], ['grapes', '葡萄']]" :key="item[0]" :value="item[0]">
          <SelectItemIndicator /><SelectItemText>{{ item[1] }}</SelectItemText>
        </SelectItem>
      </SelectViewport>
    </SelectContent>
  </Select>
</template>
