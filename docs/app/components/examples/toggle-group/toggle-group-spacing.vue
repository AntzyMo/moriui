<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const alignment = shallowRef('top')
</script>

<template>
  <ToggleGroup
    v-model="alignment"
    :spacing="4"
    aria-label="对齐方向"
    size="sm"
    type="single"
    variant="outline"
  >
    <ToggleGroupItem value="top">
      上
    </ToggleGroupItem>
    <ToggleGroupItem value="bottom">
      下
    </ToggleGroupItem>
    <ToggleGroupItem value="left">
      左
    </ToggleGroupItem>
    <ToggleGroupItem value="right">
      右
    </ToggleGroupItem>
  </ToggleGroup>
</template>
