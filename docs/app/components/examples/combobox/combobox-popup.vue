<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    ComboboxViewport
  } from 'moriui'

  const selected = shallowRef<string>()
  const countries = ['中国', '日本', '新加坡']
</script>

<template>
  <Combobox v-model="selected">
    <ComboboxTrigger class="w-64" aria-label="选择国家">
      {{ selected ?? '选择国家' }}
    </ComboboxTrigger>
    <ComboboxContent>
      <ComboboxInput aria-label="搜索国家" placeholder="搜索…" />
      <ComboboxViewport>
        <ComboboxEmpty>没有匹配项。</ComboboxEmpty><ComboboxItem v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </Combobox>
</template>
