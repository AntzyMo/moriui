<script setup lang="ts">
  import { Copy, Download, Edit, Share2, Trash2 } from '@lucide/vue'
  import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from 'moriui'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        操作
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Edit class="size-4" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy class="size-4" />
          复制
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2 class="size-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Share2 class="size-4" />
        分享
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Download class="size-4" />
        下载
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
