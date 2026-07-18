<script setup lang="ts">
  import { Plus } from '@lucide/vue'
  import { Button, ButtonGroup, InputGroup, InputGroupInput } from 'moriui'
</script>

<template>
  <ButtonGroup>
    <ButtonGroup>
      <Button size="icon" variant="outline" aria-label="添加附件">
        <Plus />
      </Button>
    </ButtonGroup>
    <ButtonGroup><InputGroup><InputGroupInput aria-label="消息" placeholder="发送消息…" /></InputGroup></ButtonGroup>
  </ButtonGroup>
</template>
