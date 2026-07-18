<script setup lang="ts">
  import { ChevronDown } from '@lucide/vue'
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
  <ButtonGroup aria-label="关注操作">
    <Button variant="outline">
      关注
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button size="icon" variant="outline" aria-label="更多关注选项">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>仅接收重要更新</DropdownMenuItem>
        <DropdownMenuItem>静音此项目</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
