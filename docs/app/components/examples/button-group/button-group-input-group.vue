<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Mic, Plus } from '@lucide/vue'
  import {
    Button,
    ButtonGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput
  } from 'moriui'

  const message = shallowRef('')
</script>

<template>
  <ButtonGroup>
    <Button size="icon" variant="outline" aria-label="添加附件">
      <Plus />
    </Button>
    <InputGroup>
      <InputGroupInput v-model="message" aria-label="消息" placeholder="发送消息…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="语音输入">
          <Mic />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </ButtonGroup>
</template>
