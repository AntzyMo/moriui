<script setup lang="ts">
import { DirectionProvider, Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">فتح القائمة</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuItem>
            الملف الشخصي
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            الإعدادات
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          تسجيل الخروج
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </DirectionProvider>
</template>
