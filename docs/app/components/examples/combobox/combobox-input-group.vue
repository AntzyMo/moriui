<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Globe } from '@lucide/vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    ComboboxViewport
  } from 'moriui'

  const selected = shallowRef<string>()
  const zones = ['亚洲/上海', '欧洲/巴黎', '美洲/纽约']
</script>

<template>
  <Combobox v-model="selected" class="w-full max-w-xs">
    <ComboboxAnchor><Globe aria-hidden="true" /><ComboboxInput aria-label="时区" placeholder="选择时区" /><ComboboxTrigger aria-label="打开时区列表" /></ComboboxAnchor>
    <ComboboxContent>
      <ComboboxViewport>
        <ComboboxEmpty>没有匹配时区。</ComboboxEmpty><ComboboxItem v-for="zone in zones" :key="zone" :value="zone">
          {{ zone }}
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </Combobox>
</template>
