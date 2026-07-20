<script setup lang="ts">
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from 'moriui'
</script>
<template>
  <Menubar class="w-72">
    <MenubarMenu>
      <MenubarTrigger>文件</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            新建标签页
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            新建窗口
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>新建无痕窗口</MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarSub>
            <MenubarSubTrigger>分享</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>邮件链接</MenubarItem>
              <MenubarItem>即时消息</MenubarItem>
              <MenubarItem>备忘录</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem>
            打印…
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>编辑</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            撤销
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            重做
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarSub>
            <MenubarSubTrigger>查找</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>搜索网页</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>查找…</MenubarItem>
              <MenubarItem>查找下一个</MenubarItem>
              <MenubarItem>查找上一个</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem>剪切</MenubarItem>
          <MenubarItem>复制</MenubarItem>
          <MenubarItem>粘贴</MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>视图</MenubarTrigger>
      <MenubarContent class="w-44">
        <MenubarGroup>
          <MenubarItem inset>重新加载</MenubarItem>
          <MenubarItem disabled inset>强制重新加载</MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem inset>切换全屏</MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem inset>隐藏侧边栏</MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>帮助</MenubarTrigger>
      <MenubarContent>
        <MenubarGroup>
          <MenubarItem>
            搜索命令
            <MenubarShortcut>⌘/</MenubarShortcut>
          </MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem>关于 MoriUI</MenubarItem>
          <MenubarItem>版本说明</MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
