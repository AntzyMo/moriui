<script setup lang="ts">
  import { ref, shallowRef } from 'vue'
  import {
    Combobox,
    ComboboxAnchor,
    ComboboxCancel,
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

  const frameworkValue = shallowRef<string>()
  const libraryValues = ref<string[]>(['moriui'])
</script>

<template>
  <section class="playground__section">
    <h2>Combobox</h2>
    <div class="playground__stack max-w-md">
      <div class="playground__stack gap-2">
        <p class="playground__example-label">
          单选与内置筛选：{{ frameworkValue ?? '尚未选择' }}
        </p>
        <Combobox v-model="frameworkValue">
          <ComboboxAnchor>
            <ComboboxInput aria-label="选择框架" placeholder="搜索框架" />
            <ComboboxCancel aria-label="清空框架搜索" />
            <ComboboxTrigger aria-label="打开框架列表" />
          </ComboboxAnchor>
          <ComboboxContent>
            <ComboboxViewport>
              <ComboboxEmpty>没有匹配的框架。</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxLabel>前端框架</ComboboxLabel>
                <ComboboxItem value="vue">
                  Vue
                  <ComboboxItemIndicator />
                </ComboboxItem>
                <ComboboxItem value="react">
                  React
                  <ComboboxItemIndicator />
                </ComboboxItem>
                <ComboboxItem value="svelte">
                  Svelte
                  <ComboboxItemIndicator />
                </ComboboxItem>
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxLabel>服务端框架</ComboboxLabel>
                <ComboboxItem value="nuxt">
                  Nuxt
                  <ComboboxItemIndicator />
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxViewport>
          </ComboboxContent>
        </Combobox>
      </div>

      <div class="playground__stack gap-2">
        <p class="playground__example-label">
          多选：{{ libraryValues.join('、') }}
        </p>
        <Combobox v-model="libraryValues" multiple>
          <ComboboxAnchor>
            <ComboboxInput aria-label="选择组件库" placeholder="搜索组件库" />
            <ComboboxCancel aria-label="清空组件库搜索" />
            <ComboboxTrigger aria-label="打开组件库列表" />
          </ComboboxAnchor>
          <ComboboxContent>
            <ComboboxViewport>
              <ComboboxEmpty>没有匹配的组件库。</ComboboxEmpty>
              <ComboboxItem value="moriui">
                MoriUI
                <ComboboxItemIndicator />
              </ComboboxItem>
              <ComboboxItem value="reka-ui">
                Reka UI
                <ComboboxItemIndicator />
              </ComboboxItem>
              <ComboboxItem value="heroui">
                HeroUI
                <ComboboxItemIndicator />
              </ComboboxItem>
            </ComboboxViewport>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  </section>
</template>
