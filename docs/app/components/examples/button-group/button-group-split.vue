<script setup lang="ts">
  import { ChevronDown } from '@lucide/vue'
  import { Button, ButtonGroup, ButtonGroupSeparator } from 'moriui'
</script>

<template>
  <ButtonGroup aria-label="发布操作">
    <Button variant="secondary">
      发布
    </Button>
    <ButtonGroupSeparator />
    <Button size="icon" variant="secondary" aria-label="更多发布选项">
      <ChevronDown />
    </Button>
  </ButtonGroup>
</template>
