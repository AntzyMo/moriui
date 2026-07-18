<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Search } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupInput } from 'moriui'

  const query = shallowRef('')
</script>

<template>
  <InputGroup>
    <InputGroupInput v-model="query" aria-label="搜索" placeholder="搜索…" /><InputGroupAddon><Search /></InputGroupAddon><InputGroupAddon align="inline-end">
      12 项
    </InputGroupAddon>
  </InputGroup>
</template>
