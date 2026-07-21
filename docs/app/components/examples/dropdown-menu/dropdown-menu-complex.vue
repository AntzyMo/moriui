<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Bell,
    CreditCard,
    HelpCircle,
    LogOut,
    Palette,
    Settings,
    User
  } from '@lucide/vue'
  import {
    Avatar,
    AvatarFallback,
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
  } from 'moriui'

  const notifications = shallowRef(true)
  const theme = shallowRef('system')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="rounded-full">
        <Avatar class="size-7">
          <AvatarFallback>张三</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-64">
      <DropdownMenuGroup>
        <DropdownMenuLabel>张三</DropdownMenuLabel>
        <DropdownMenuItem>
          <User class="size-4" />
          个人资料
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard class="size-4" />
          账单
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="size-4" />
          设置
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem v-model="notifications">
        <Bell class="size-4" />
        通知提醒
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup v-model="theme">
        <DropdownMenuLabel>主题</DropdownMenuLabel>
        <DropdownMenuRadioItem value="light">
          <Palette class="size-4" />
          浅色
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark">
          <Palette class="size-4" />
          深色
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system">
          <Palette class="size-4" />
          跟随系统
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>更多</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>
            <HelpCircle class="size-4" />
            帮助中心
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut class="size-4" />
            退出登录
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
