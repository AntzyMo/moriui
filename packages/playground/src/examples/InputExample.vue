<script setup lang="ts">
  import { Input } from 'moriui'
  import { shallowRef } from 'vue'

  const name = shallowRef('MoriUI')
</script>

<template>
  <section class="playground__section">
    <h2>Input</h2>
    <div class="playground__stack">
      <Input v-model="name" aria-label="组件名称" placeholder="输入组件名称" />
      <Input default-value="仅首次初始化" aria-label="非受控输入" />
      <Input aria-invalid="true" placeholder="错误状态" />
      <Input disabled default-value="不可用" aria-label="不可用输入" />
    </div>
  </section>
</template>
