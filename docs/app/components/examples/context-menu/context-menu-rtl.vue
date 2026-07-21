<script setup lang="ts">
  import { ref } from 'vue'
  import { Check } from '@lucide/vue'
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuItemIndicator,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
    DirectionProvider
  } from 'moriui'

  const wrap = ref(true)
</script>

<template>
  <DirectionProvider dir="rtl">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
          انقر بالزر الأيمن هنا
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          نسخ
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          قص
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          لصق
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem v-model="wrap">
          <ContextMenuItemIndicator>
            <Check class="size-3" />
          </ContextMenuItemIndicator>
          التفاف النص
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  </DirectionProvider>
</template>
