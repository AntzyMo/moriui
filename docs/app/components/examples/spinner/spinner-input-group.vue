<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, Spinner } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <InputGroup>
      <InputGroupInput placeholder="发送消息…" disabled />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="正在验证…" disabled />
      <InputGroupAddon align="inline-end">
        <Spinner /> 验证中…
        <InputGroupButton class="ml-auto" variant="default">
          <ArrowUp />
          <span class="sr-only">发送</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
