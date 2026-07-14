<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
  } from 'moriui'

  const contextMenuOpen = shallowRef(false)
  const showStatusBar = shallowRef(true)
  const contextMenuTheme = shallowRef('system')
</script>

<template>
  <section class="playground__section">
    <h2>Context Menu</h2>
    <ContextMenu v-model:open="contextMenuOpen">
      <ContextMenuTrigger class="playground__context-menu-trigger">
        <strong>在此区域点击右键</strong>
        <span>使用鼠标右键或触摸设备长按打开菜单。</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>编辑</ContextMenuLabel>
          <ContextMenuItem>
            后退
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            前进
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            重新加载
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem v-model="showStatusBar">
          显示状态栏
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup v-model="contextMenuTheme">
          <ContextMenuLabel>主题</ContextMenuLabel>
          <ContextMenuRadioItem value="light">
            浅色
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">
            深色
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">
            跟随系统
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>更多工具</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>开发者工具</ContextMenuItem>
            <ContextMenuItem>查看页面源代码</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
    <p class="playground__example-label mt-2">
      菜单：{{ contextMenuOpen ? '已打开' : '已关闭' }}；状态栏：{{ showStatusBar ? '显示' : '隐藏' }}；主题：{{ contextMenuTheme }}
    </p>
  </section>
</template>
