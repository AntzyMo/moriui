<script setup lang="ts">
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from 'moriui'
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">打开</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuLabel>我的账户</DropdownMenuLabel>
        <DropdownMenuItem>个人资料<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>账单<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>设置<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>团队</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>邀请用户</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>邮件</DropdownMenuItem>
            <DropdownMenuItem>消息</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>更多…</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>新建团队<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>支持</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>退出登录<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
