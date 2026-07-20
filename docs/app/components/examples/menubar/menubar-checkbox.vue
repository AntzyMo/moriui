<script setup lang="ts">
import { shallowRef } from 'vue'
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from 'moriui'

const showBookmarksBar = shallowRef(true)
const showFullUrls = shallowRef(false)
const showStrikethrough = shallowRef(true)
const showCode = shallowRef(false)
const showSuperscript = shallowRef(false)
</script>
<template>
  <Menubar class="w-72">
    <MenubarMenu>
      <MenubarTrigger>视图</MenubarTrigger>
      <MenubarContent class="w-64">
        <MenubarCheckboxItem v-model="showBookmarksBar">
          显示书签栏
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model="showFullUrls">
          显示完整网址
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarItem inset>
          重新加载
          <MenubarShortcut>⌘R</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled inset>
          强制重新加载
          <MenubarShortcut>⇧⌘R</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>格式</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem v-model="showStrikethrough">
          删除线
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model="showCode">
          代码
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model="showSuperscript">
          上标
        </MenubarCheckboxItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
