<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { ToggleGroup, ToggleGroupItem } from 'moriui'

  const alignment = shallowRef('center')
  const formats = shallowRef<string[]>(['bold'])
</script>

<template>
  <section class="playground__section">
    <h2>Toggle Group</h2>
    <div class="playground__stack">
      <ToggleGroup
        v-model="alignment"
        aria-label="文本对齐"
        :spacing="0"
        type="single"
        variant="outline"
      >
        <ToggleGroupItem value="left">
          左对齐
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          居中
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          右对齐
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        v-model="formats"
        aria-label="文本格式"
        type="multiple"
        size="sm"
      >
        <ToggleGroupItem value="bold">
          粗体
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" variant="outline">
          斜体
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" disabled>
          下划线
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        aria-label="垂直操作"
        orientation="vertical"
        type="single"
        size="lg"
      >
        <ToggleGroupItem value="up">
          上移
        </ToggleGroupItem>
        <ToggleGroupItem value="down">
          下移
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </section>
</template>
