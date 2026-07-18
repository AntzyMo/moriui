<script setup lang="ts">
  import { Button, ButtonGroup, ButtonGroupSeparator } from 'moriui'
</script>

<template>
  <ButtonGroup aria-label="剪贴板操作">
    <Button size="sm" variant="secondary">
      复制
    </Button>
    <ButtonGroupSeparator />
    <Button size="sm" variant="secondary">
      粘贴
    </Button>
  </ButtonGroup>
</template>
