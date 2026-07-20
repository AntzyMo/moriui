<script setup lang="ts">
import { ref } from 'vue'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from 'moriui'

const side = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
const sides = [
  { label: '上方', value: 'top' as const },
  { label: '下方', value: 'bottom' as const },
  { label: '左侧', value: 'left' as const },
  { label: '右侧', value: 'right' as const }
]
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex items-center gap-2">
      <button
        v-for="s in sides"
        :key="s.value"
        class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
        :class="side === s.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent'"
        @click="side = s.value"
      >
        {{ s.label }}
      </button>
    </div>
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="flex items-center justify-center rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
          右键点击 — 菜单将出现在{{ sides.find(s => s.value === side)?.label }}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent :side="side">
        <ContextMenuItem>查看详情</ContextMenuItem>
        <ContextMenuItem>编辑</ContextMenuItem>
        <ContextMenuItem>删除</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>属性</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>
