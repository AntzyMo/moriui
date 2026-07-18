<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const small = shallowRef('top')
  const normal = shallowRef('left')
  const options = [
    { value: 'top', label: '上' },
    { value: 'bottom', label: '下' },
    { value: 'left', label: '左' },
    { value: 'right', label: '右' }
  ]
</script>

<template>
  <div class="flex flex-col gap-4">
    <ToggleGroup
      v-model="small"
      aria-label="小号对齐"
      size="sm"
      type="single"
      variant="outline"
    >
      <ToggleGroupItem v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup
      v-model="normal"
      aria-label="默认对齐"
      type="single"
      variant="outline"
    >
      <ToggleGroupItem v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
