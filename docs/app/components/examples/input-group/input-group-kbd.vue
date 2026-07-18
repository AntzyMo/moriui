<script setup lang="ts">
  import { Search } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupInput, Kbd } from 'moriui'
</script>

<template>
  <InputGroup class="w-full max-w-sm">
    <InputGroupInput aria-label="全局搜索" placeholder="搜索…" /><InputGroupAddon><Search /></InputGroupAddon><InputGroupAddon align="inline-end">
      <Kbd>⌘K</Kbd>
    </InputGroupAddon>
  </InputGroup>
</template>
