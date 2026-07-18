<script setup lang="ts">
  import { Input } from 'moriui'
  import { shallowRef } from 'vue'

  const value = shallowRef('')
</script>

<template>
  <Input v-model="value" aria-label="文本" placeholder="输入文本" />
</template>
