<script setup lang="ts">
  import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'moriui'
</script>

<template>
  <ResizablePanelGroup
    direction="vertical"
    class="min-h-[200px] max-w-sm rounded-lg border"
  >
    <ResizablePanel :default-size="25">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">头部</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel :default-size="75">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">内容区域</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
