<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'
  import { Bold, Italic } from '@lucide/vue'

  const italic = shallowRef(false)
  const bold = shallowRef(true)
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Toggle v-model="italic" aria-label="切换斜体" variant="outline">
      <Italic aria-hidden="true" />斜体
    </Toggle>
    <Toggle v-model="bold" aria-label="切换粗体" variant="outline">
      <Bold aria-hidden="true" />粗体
    </Toggle>
  </div>
</template>
