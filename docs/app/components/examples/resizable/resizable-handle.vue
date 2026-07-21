<script setup lang="ts">
  import { GripVertical } from '@lucide/vue'
  import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'moriui'
</script>

<template>
  <ResizablePanelGroup
    direction="horizontal"
    class="min-h-[200px] max-w-sm rounded-lg border"
  >
    <ResizablePanel :default-size="25">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">侧边栏</span>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle>
      <GripVertical class="h-4 w-4" />
    </ResizableHandle>
    <ResizablePanel :default-size="75">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">内容区域</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
