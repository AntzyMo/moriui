<script setup lang="ts">
  import { shallowRef } from 'vue'
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

  const selected = shallowRef<string>()
  const frameworks = ['Vue', 'Nuxt', 'SvelteKit', 'Astro']
</script>

<template>
  <div dir="rtl" class="w-full max-w-xs">
    <Combobox v-model="selected">
      <ComboboxAnchor>
        <ComboboxInput dir="rtl" aria-label="الفئات" placeholder="أضف فئات" />

        <ComboboxTrigger aria-label="打开选项" />
      </ComboboxAnchor>
      <ComboboxContent dir="rtl">
        <ComboboxViewport>
          <ComboboxEmpty>没有匹配项。</ComboboxEmpty>
          <ComboboxItem v-for="item in frameworks" :key="item" :value="item">
            {{ item }}<ComboboxItemIndicator />
          </ComboboxItem>
        </ComboboxViewport>
      </ComboboxContent>
    </Combobox>
    <p class="mt-2 text-xs text-muted-foreground">
      当前选择：{{ selected ?? '无' }}
    </p>
  </div>
</template>
