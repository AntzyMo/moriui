<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const filter = shallowRef('all')
</script>

<template>
  <ToggleGroup
    v-model="filter"
    aria-label="来电筛选"
    type="single"
    variant="outline"
  >
    <ToggleGroupItem value="all">
      全部
    </ToggleGroupItem>
    <ToggleGroupItem value="missed">
      未接
    </ToggleGroupItem>
  </ToggleGroup>
</template>
