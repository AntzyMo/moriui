<script setup lang="ts">
  import { Copy, Play } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, Textarea } from 'moriui'
</script>

<template>
  <InputGroup class="w-full max-w-md">
    <Textarea
      data-slot="input-group-control"
      class="min-h-40 resize-none"
      aria-label="代码"
      placeholder="console.log('你好，MoriUI')"
    /><InputGroupAddon align="block-start">
      <InputGroupText>script.js</InputGroupText><InputGroupButton class="ms-auto" size="icon-xs" aria-label="复制">
        <Copy />
      </InputGroupButton>
    </InputGroupAddon><InputGroupAddon align="block-end">
      <InputGroupText>第 1 行</InputGroupText><InputGroupButton class="ms-auto" variant="default">
        <Play />运行
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
