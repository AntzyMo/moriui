<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const layout = shallowRef('list')
</script>

<template>
  <ToggleGroup
    v-model="layout"
    aria-label="طريقة العرض"
    dir="rtl"
    type="single"
    variant="outline"
  >
    <ToggleGroupItem value="list">
      قائمة
    </ToggleGroupItem>
    <ToggleGroupItem value="grid">
      شبكة
    </ToggleGroupItem>
    <ToggleGroupItem value="cards">
      بطاقات
    </ToggleGroupItem>
  </ToggleGroup>
</template>
