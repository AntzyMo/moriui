<script setup lang="ts">
  import { computed, ref, shallowRef } from 'vue'
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SelectViewport
  } from 'moriui'

  const framework = shallowRef<string>()
  const libraries = ref<string[]>(['moriui'])
  const longOptions = computed(() => Array.from({ length: 24 }, (_, index) => `选项 ${index + 1}`))
</script>

<template>
  <section class="playground__section">
    <h2>Select</h2>
    <div class="playground__stack max-w-md">
      <div class="playground__stack gap-2">
        <p class="playground__example-label">
          单选与分组：{{ framework ?? '尚未选择' }}
        </p>
        <Select v-model="framework">
          <SelectTrigger aria-label="选择框架">
            <SelectValue placeholder="选择一个框架" />
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>前端框架</SelectLabel>
                <SelectItem value="vue">
                  <SelectItemIndicator />
                  <SelectItemText>Vue</SelectItemText>
                </SelectItem>
                <SelectItem value="react">
                  <SelectItemIndicator />
                  <SelectItemText>React</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>其他</SelectLabel>
                <SelectItem disabled value="svelte">
                  <SelectItemIndicator />
                  <SelectItemText>Svelte（暂不可用）</SelectItemText>
                </SelectItem>
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </Select>
      </div>

      <div class="playground__stack gap-2">
        <p class="playground__example-label">
          多选：{{ libraries.join('、') }}
        </p>
        <Select v-model="libraries" multiple>
          <SelectTrigger aria-label="选择组件库">
            <SelectValue placeholder="选择组件库" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectViewport>
              <SelectItem value="moriui">
                <SelectItemIndicator />
                <SelectItemText>MoriUI</SelectItemText>
              </SelectItem>
              <SelectItem value="reka-ui">
                <SelectItemIndicator />
                <SelectItemText>Reka UI</SelectItemText>
              </SelectItem>
              <SelectItem value="heroui">
                <SelectItemIndicator />
                <SelectItemText>HeroUI</SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select>
      </div>

      <div class="playground__stack gap-2">
        <p class="playground__example-label">
          长列表与滚动按钮
        </p>
        <Select>
          <SelectTrigger aria-label="选择长列表选项">
            <SelectValue placeholder="选择一个选项" />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectViewport>
              <SelectItem v-for="option in longOptions" :key="option" :value="option">
                <SelectItemIndicator />
                <SelectItemText>{{ option }}</SelectItemText>
              </SelectItem>
            </SelectViewport>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
      </div>
    </div>
  </section>
</template>
