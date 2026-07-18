<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'

  const disabled = shallowRef(false)
  const disabledOutline = shallowRef(true)
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Toggle v-model="disabled" aria-label="禁用切换按钮" disabled>
      不可用
    </Toggle>
    <Toggle
      v-model="disabledOutline"
      aria-label="禁用描边切换按钮"
      disabled
      variant="outline"
    >
      不可用
    </Toggle>
  </div>
</template>
