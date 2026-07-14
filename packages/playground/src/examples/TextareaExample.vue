<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Textarea } from 'moriui'

  const description = shallowRef('MoriUI 是基于 Reka UI 与 Nova 视觉语言的 Vue 组件库。')
</script>

<template>
  <section class="playground__section">
    <h2>Textarea</h2>
    <div class="playground__stack">
      <Textarea v-model="description" aria-label="组件描述" placeholder="输入组件描述" />
      <Textarea default-value="仅首次初始化" aria-label="非受控文本域" />
      <Textarea aria-invalid="true" placeholder="错误状态" />
      <Textarea disabled default-value="不可用" aria-label="不可用文本域" />
    </div>
  </section>
</template>
