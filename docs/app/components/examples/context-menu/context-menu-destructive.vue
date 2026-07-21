<script setup lang="ts">
  import { Trash2 } from '@lucide/vue'
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
  } from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        右键点击文件区域
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        <Trash2 class="mr-1.5 size-4" />
        重命名
      </ContextMenuItem>
      <ContextMenuItem>
        <Trash2 class="mr-1.5 size-4" />
        复制
      </ContextMenuItem>
      <ContextMenuItem>
        <Trash2 class="mr-1.5 size-4" />
        移动
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem class="text-destructive focus:text-destructive-foreground">
        <Trash2 class="mr-1.5 size-4" />
        删除文件
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
