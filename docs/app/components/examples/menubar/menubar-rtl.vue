<script setup lang="ts">
  import {
    DirectionProvider,
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
  <DirectionProvider dir="rtl">
    <Menubar class="w-72">
      <MenubarMenu>
        <MenubarTrigger>ملف</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              علامة تبويب جديدة
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              نافذة جديدة
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              نافذة التصفح المتخفي
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
              طباعة…
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>تعديل</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              تراجع
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              إعادة
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>قص</MenubarItem>
            <MenubarItem>نسخ</MenubarItem>
            <MenubarItem>لصق</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
              تسجيل الخروج
              <MenubarShortcut>⇧⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </DirectionProvider>
</template>
