<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Bold, Italic, Underline } from '@lucide/vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const formats = shallowRef(['bold', 'italic'])
</script>

<template>
  <ToggleGroup
    v-model="formats"
    :spacing="1"
    aria-label="文字格式"
    orientation="vertical"
    type="multiple"
  >
    <ToggleGroupItem value="bold" aria-label="切换粗体">
      <Bold aria-hidden="true" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="切换斜体">
      <Italic aria-hidden="true" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="切换下划线">
      <Underline aria-hidden="true" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
