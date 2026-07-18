<script setup lang="ts">
  import { Bot, ChevronDown } from '@lucide/vue'
  import {
    Button,
    ButtonGroup,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from 'moriui'
</script>

<template>
  <ButtonGroup aria-label="智能助手">
    <Button variant="outline">
      <Bot />Copilot
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button size="icon" variant="outline" aria-label="打开助手选项">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>总结当前页面</DropdownMenuItem>
        <DropdownMenuItem>生成后续任务</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
