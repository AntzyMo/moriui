<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'

  const enabled = shallowRef(false)
</script>

<template>
  <section class="playground__section">
    <h2>Toggle</h2>
    <div class="playground__row">
      <Toggle v-model="enabled" aria-label="切换斜体">
        斜体
      </Toggle>
      <Toggle aria-label="小尺寸切换" size="sm">
        小
      </Toggle>
      <Toggle aria-label="大尺寸切换" size="lg">
        大尺寸
      </Toggle>
      <Toggle aria-label="描边切换" variant="outline">
        描边
      </Toggle>
      <Toggle aria-label="不可用切换" disabled>
        不可用
      </Toggle>
      <span>受控状态：{{ enabled ? '已启用' : '未启用' }}</span>
    </div>
  </section>
</template>
