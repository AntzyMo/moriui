<script setup lang="ts">
import { DirectionProvider, ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'moriui'
</script>
<template>
  <DirectionProvider dir="rtl">
    <ResizablePanelGroup
      direction="horizontal"
      class="max-w-sm rounded-lg border"
    >
      <ResizablePanel :default-size="50">
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">واحد</span>
        </div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="50">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel :default-size="25">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">اثنان</span>
            </div>
          </ResizablePanel>
          <ResizableHandle with-handle />
          <ResizablePanel :default-size="75">
            <div class="flex h-full items-center justify-center p-6">
              <span class="font-semibold">ثلاثة</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </DirectionProvider>
</template>
