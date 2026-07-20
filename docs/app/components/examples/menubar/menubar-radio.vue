<script setup lang="ts">
import { shallowRef } from 'vue'
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarTrigger } from 'moriui'

const profile = shallowRef('benoit')
const theme = shallowRef('system')
</script>
<template>
  <Menubar class="w-72">
    <MenubarMenu>
      <MenubarTrigger>个人资料</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup v-model="profile">
          <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
          <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
          <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarGroup>
          <MenubarItem inset>编辑…</MenubarItem>
          <MenubarItem inset>添加资料…</MenubarItem>
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>主题</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup v-model="theme">
          <MenubarRadioItem value="light">浅色</MenubarRadioItem>
          <MenubarRadioItem value="dark">深色</MenubarRadioItem>
          <MenubarRadioItem value="system">跟随系统</MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
