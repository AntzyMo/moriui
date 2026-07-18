<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxTrigger,
    ComboboxViewport
  } from 'moriui'

  const selected = ref<string[]>(['Vue'])
  const frameworks = ['Vue', 'Nuxt', 'SvelteKit', 'Astro']
</script>

<template>
  <div class="w-full max-w-xs">
    <Combobox v-model="selected" multiple>
      <ComboboxAnchor>
        <ComboboxInput aria-label="选择框架" placeholder="搜索框架…" />

        <ComboboxTrigger aria-label="打开选项" />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxViewport>
          <ComboboxEmpty>没有匹配项。</ComboboxEmpty>
          <ComboboxItem v-for="item in frameworks" :key="item" :value="item">
            {{ item }}<ComboboxItemIndicator />
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </Combobox>
    <p class="mt-2 text-xs text-muted-foreground">
      当前选择：{{ selected.join('、') || '无' }}
    </p>
  </div>
</template>
