<script setup lang="ts">
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
  } from 'moriui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        在代码区域右键点击
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>格式化文档</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>插入代码片段</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>函数</ContextMenuItem>
          <ContextMenuItem>循环</ContextMenuItem>
          <ContextMenuItem>条件判断</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>组件模板</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Vue 组件</ContextMenuItem>
              <ContextMenuItem>React 组件</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSub>
        <ContextMenuSubTrigger>重构</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>提取变量</ContextMenuItem>
          <ContextMenuItem>提取函数</ContextMenuItem>
          <ContextMenuItem>重命名符号</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>在终端中打开</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
