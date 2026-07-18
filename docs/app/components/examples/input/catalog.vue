<script setup lang="ts">
  import { Input } from 'moriui'
  import { shallowRef } from 'vue'

  const value = shallowRef('Nova 工作台')
</script>

<template>
  <Input v-model="value" aria-label="项目名称" placeholder="项目名称" />
</template>
