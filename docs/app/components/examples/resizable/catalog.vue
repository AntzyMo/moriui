<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'moriui'
</script>
<template>
  <ResizablePanelGroup direction="horizontal" class="max-w-sm"><ResizablePanel :default-size="50"><div class="flex h-[200px] items-center justify-center p-6"><span class="font-semibold">面板一</span></div></ResizablePanel><ResizableHandle /><ResizablePanel :default-size="50"><div class="flex h-[200px] items-center justify-center p-6"><span class="font-semibold">面板二</span></div></ResizablePanel></ResizablePanelGroup>
</template>
