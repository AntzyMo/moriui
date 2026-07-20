<script setup lang="ts">
import { Trash2, AlertTriangle, Ban, UserX } from '@lucide/vue'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from 'moriui'
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">危险操作</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuItem class="text-destructive focus:text-destructive">
          <Trash2 class="size-4" />
          删除项目
        </DropdownMenuItem>
        <DropdownMenuItem class="text-destructive focus:text-destructive">
          <UserX class="size-4" />
          移除成员
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-destructive focus:text-destructive">
        <Ban class="size-4" />
        禁用账户
      </DropdownMenuItem>
      <DropdownMenuItem class="text-destructive focus:text-destructive">
        <AlertTriangle class="size-4" />
        报告问题
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
