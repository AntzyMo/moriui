<script setup lang="ts">
  import {
    File,
    Folder,
    HelpCircle,
    Save,
    Settings,
    Trash2
  } from '@lucide/vue'
  import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
  } from 'moriui'
</script>

<template>
  <Menubar class="w-72">
    <MenubarMenu>
      <MenubarTrigger>文件</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <File class="size-4" />
          新建文件
          <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          <Folder class="size-4" />
          打开文件夹
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <Save class="size-4" />
          保存
          <MenubarShortcut>⌘S</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>更多</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            <Settings class="size-4" />
            设置
          </MenubarItem>
          <MenubarItem>
            <HelpCircle class="size-4" />
            帮助
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Trash2 class="size-4" />
            删除
          </MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
