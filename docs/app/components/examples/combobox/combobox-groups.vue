<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxLabel,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxViewport
  } from 'moriui'

  const selected = shallowRef<string>()
  const groups = [
    { label: '前端框架', items: ['Vue', 'React', 'Svelte'] },
    { label: '服务端框架', items: ['Nuxt', 'Next.js'] }
  ]
</script>

<template>
  <div class="w-full max-w-xs">
    <Combobox v-model="selected">
      <ComboboxAnchor>
        <ComboboxInput aria-label="选择框架" placeholder="搜索框架…" />

        <ComboboxTrigger aria-label="打开选项" />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxViewport>
          <ComboboxEmpty>没有匹配项。</ComboboxEmpty>
          <template v-for="(group, index) in groups" :key="group.label">
            <ComboboxGroup>
              <ComboboxLabel>{{ group.label }}</ComboboxLabel>
              <ComboboxItem v-for="item in group.items" :key="item" :value="item">
                {{ item }}<ComboboxItemIndicator />
              </ComboboxItem>
            </ComboboxGroup>
            <ComboboxSeparator v-if="index < groups.length - 1" />
          </template>
        </ComboboxViewport>
      </ComboboxContent>
    </Combobox>
    <p class="mt-2 text-xs text-muted-foreground">
      当前选择：{{ selected ?? '无' }}
    </p>
  </div>
</template>
