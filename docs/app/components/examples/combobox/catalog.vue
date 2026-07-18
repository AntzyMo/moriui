<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    ComboboxViewport
  } from 'moriui'

  const value = shallowRef<string>()
</script>

<template>
  <Combobox v-model="value" class="w-full">
    <ComboboxAnchor><ComboboxInput aria-label="框架" placeholder="选择框架" /><ComboboxTrigger aria-label="打开框架列表" /></ComboboxAnchor>
    <ComboboxContent>
      <ComboboxViewport>
        <ComboboxItem value="Vue">
          Vue
        </ComboboxItem><ComboboxItem value="Nuxt">
          Nuxt
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </Combobox>
</template>
