<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, ToggleGroup, ToggleGroupItem } from 'moriui'

  const fontWeight = shallowRef('normal')
  const weights = [
    { value: 'light', label: '细体', class: 'font-light' },
    { value: 'normal', label: '常规', class: 'font-normal' },
    { value: 'medium', label: '中等', class: 'font-medium' },
    { value: 'bold', label: '粗体', class: 'font-bold' }
  ]
</script>

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel>字重</FieldLabel>
    <ToggleGroup
      v-model="fontWeight"
      aria-label="字重"
      size="lg"
      type="single"
      variant="outline"
    >
      <ToggleGroupItem
        v-for="item in weights"
        :key="item.value"
        :aria-label="item.label"
        class="size-16 flex-col rounded-xl"
        :value="item.value"
      >
        <span class="text-2xl leading-none" :class="[item.class]">Aa</span>
        <span class="text-muted-foreground text-xs">{{ item.label }}</span>
      </ToggleGroupItem>
    </ToggleGroup>
    <FieldDescription>当前使用 <code class="bg-muted rounded-md px-1 py-0.5 font-mono">font-{{ fontWeight }}</code>。</FieldDescription>
  </Field>
</template>
