<script setup lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd
  } from 'moriui'
</script>

<template>
  <InputGroup class="w-full max-w-sm">
    <InputGroupInput aria-label="搜索" placeholder="搜索命令" /><InputGroupAddon align="inline-end">
      <Kbd>⌘ K</Kbd>
    </InputGroupAddon>
  </InputGroup>
</template>
