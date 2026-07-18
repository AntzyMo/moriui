<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Bold, Italic, Underline } from '@lucide/vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const formats = shallowRef(['bold'])
</script>

<template>
  <ToggleGroup
    v-model="formats"
    aria-label="文字格式"
    size="sm"
    type="multiple"
    variant="outline"
  >
    <ToggleGroupItem value="bold" aria-label="粗体">
      <Bold aria-hidden="true" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="斜体">
      <Italic aria-hidden="true" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="下划线">
      <Underline aria-hidden="true" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
