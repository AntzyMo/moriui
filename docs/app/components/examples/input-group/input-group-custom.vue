<script setup lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupButton, Textarea } from 'moriui'
</script>

<template>
  <InputGroup class="w-full max-w-sm">
    <Textarea
      data-slot="input-group-control"
      class="field-sizing-content min-h-16 resize-none"
      aria-label="自动增高文本"
      placeholder="输入多行内容…"
    /><InputGroupAddon align="block-end">
      <InputGroupButton class="ms-auto" variant="default">
        提交
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
