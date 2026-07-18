<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'
  import { Italic } from '@lucide/vue'

  const italic = shallowRef(false)
</script>

<template>
  <Toggle v-model="italic" aria-label="切换斜体">
    <Italic aria-hidden="true" />斜体
  </Toggle>
</template>
