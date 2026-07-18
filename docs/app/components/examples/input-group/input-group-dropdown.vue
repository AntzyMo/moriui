<script setup lang="ts">
  import { ChevronDown, MoreHorizontal } from '@lucide/vue'
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput
  } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput aria-label="文件名" placeholder="输入文件名" /><InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <InputGroupButton size="icon-xs" aria-label="文件操作">
              <MoreHorizontal />
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>重命名</DropdownMenuItem>
            <DropdownMenuItem>清空</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup><InputGroup>
      <InputGroupInput aria-label="搜索词" placeholder="搜索…" /><InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <InputGroupButton>文档<ChevronDown /></InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>文档</DropdownMenuItem>
            <DropdownMenuItem>代码</DropdownMenuItem>
            <DropdownMenuItem>全部内容</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
