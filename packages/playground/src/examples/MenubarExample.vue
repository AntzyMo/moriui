<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Menubar,
    MenubarArrow,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
  } from 'moriui'

  const activeMenu = shallowRef('')
  const showStatusBar = shallowRef(true)
  const profile = shallowRef('个人')
</script>

<template>
  <section class="playground__section">
    <h2>Menubar</h2>
    <Menubar v-model="activeMenu" loop>
      <MenubarMenu value="file">
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarArrow />
          <MenubarItem>
            新建标签页
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            新建窗口
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            新建无痕窗口
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>分享</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>复制链接</MenubarItem>
              <MenubarItem>发送邮件</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem v-model="showStatusBar">
            显示状态栏
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            重新加载
            <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="profile">
        <MenubarTrigger>个人资料</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup v-model="profile">
            <MenubarRadioItem value="个人">
              个人
            </MenubarRadioItem>
            <MenubarRadioItem value="工作">
              工作
            </MenubarRadioItem>
            <MenubarRadioItem value="访客">
              访客
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    <p class="playground__example-label mt-2">
      当前菜单：{{ activeMenu || '未打开' }}；状态栏：{{ showStatusBar ? '显示' : '隐藏' }}；资料：{{ profile }}
    </p>
  </section>
</template>
