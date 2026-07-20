<script setup lang="ts">
import { ref } from 'vue'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItemIndicator,
  ContextMenuSeparator,
  ContextMenuTrigger
} from 'moriui'
import { Check } from '@lucide/vue'

const showToolbar = ref(true)
const showStatusBar = ref(false)
const showSidebar = ref(true)
const wordWrap = ref(true)
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        在编辑器区域右键点击
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuCheckboxItem v-model="showToolbar">
        <ContextMenuItemIndicator>
          <Check class="size-3" />
        </ContextMenuItemIndicator>
        显示工具栏
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem v-model="showStatusBar">
        <ContextMenuItemIndicator>
          <Check class="size-3" />
        </ContextMenuItemIndicator>
        显示状态栏
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem v-model="showSidebar">
        <ContextMenuItemIndicator>
          <Check class="size-3" />
        </ContextMenuItemIndicator>
        显示侧边栏
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem v-model="wordWrap">
        <ContextMenuItemIndicator>
          <Check class="size-3" />
        </ContextMenuItemIndicator>
        自动换行
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
