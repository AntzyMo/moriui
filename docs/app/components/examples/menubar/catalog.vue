<script setup lang="ts">
  import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
  } from 'moriui'
</script>

<template>
  <Menubar class="w-72">
    <MenubarMenu>
      <MenubarTrigger>文件</MenubarTrigger>
      <MenubarContent><MenubarItem>打开</MenubarItem></MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
