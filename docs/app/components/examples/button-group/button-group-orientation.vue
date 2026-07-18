<script setup lang="ts">
  import { Minus, Plus } from '@lucide/vue'
  import { Button, ButtonGroup } from 'moriui'
</script>

<template>
  <ButtonGroup orientation="vertical" aria-label="缩放控制">
    <Button size="icon" variant="outline" aria-label="放大">
      <Plus />
    </Button>
    <Button size="icon" variant="outline" aria-label="缩小">
      <Minus />
    </Button>
  </ButtonGroup>
</template>
