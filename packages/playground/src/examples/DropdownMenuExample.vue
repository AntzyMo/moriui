<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Button,
    DropdownMenu,
    DropdownMenuArrow,
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

  const dropdownMenuOpen = shallowRef(false)
  const showStatusBar = shallowRef(true)
  const dropdownMenuTheme = shallowRef('system')
</script>

<template>
  <section class="playground__section">
    <h2>Dropdown Menu</h2>
    <DropdownMenu v-model:open="dropdownMenuOpen">
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          打开操作菜单
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuArrow />
        <DropdownMenuGroup>
          <DropdownMenuLabel>编辑</DropdownMenuLabel>
          <DropdownMenuItem>
            后退
            <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            前进
            <DropdownMenuShortcut>⌘]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            重新加载
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem v-model="showStatusBar">
          显示状态栏
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup v-model="dropdownMenuTheme">
          <DropdownMenuLabel>主题</DropdownMenuLabel>
          <DropdownMenuRadioItem value="light">
            浅色
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            深色
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            跟随系统
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>更多工具</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>开发者工具</DropdownMenuItem>
            <DropdownMenuItem>查看页面源代码</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
    <p class="playground__example-label mt-2">
      菜单：{{ dropdownMenuOpen ? '已打开' : '已关闭' }}；状态栏：{{ showStatusBar ? '显示' : '隐藏' }}；主题：{{ dropdownMenuTheme }}
    </p>
  </section>
</template>
