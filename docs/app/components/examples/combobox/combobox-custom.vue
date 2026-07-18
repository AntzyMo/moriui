<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    ComboboxViewport,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle
  } from 'moriui'

  const selected = shallowRef<string>()
  const countries = [
    { value: 'cn', label: '中国', region: '亚洲' },
    { value: 'fr', label: '法国', region: '欧洲' },
    { value: 'ca', label: '加拿大', region: '北美洲' }
  ]
</script>

<template>
  <Combobox v-model="selected">
    <ComboboxAnchor><ComboboxInput aria-label="国家" placeholder="搜索国家…" /><ComboboxTrigger aria-label="打开国家列表" /></ComboboxAnchor>
    <ComboboxContent>
      <ComboboxViewport>
        <ComboboxEmpty>没有匹配国家。</ComboboxEmpty><ComboboxItem v-for="country in countries" :key="country.value" :value="country.value">
          <Item size="xs" class="p-0">
            <ItemContent><ItemTitle>{{ country.label }}</ItemTitle><ItemDescription>{{ country.region }} · {{ country.value }}</ItemDescription></ItemContent>
          </Item>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </Combobox>
</template>
