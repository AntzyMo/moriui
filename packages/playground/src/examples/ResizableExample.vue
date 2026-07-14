<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
  } from 'moriui'

  const layout = shallowRef<number[]>([30, 70])
</script>

<template>
  <section class="playground__section">
    <h2>Resizable</h2>
    <div class="playground__resizable-examples">
      <div class="playground__resizable-example">
        <p class="playground__example-label">
          横向分栏与布局回调
        </p>
        <ResizablePanelGroup
          class="playground__resizable-group"
          direction="horizontal"
          @layout="layout = $event"
        >
          <ResizablePanel :default-size="30" :min-size="20">
            <div class="playground__resizable-panel">
              侧栏 {{ Math.round(layout[0] ?? 30) }}%
            </div>
          </ResizablePanel>
          <ResizableHandle with-handle />
          <ResizablePanel :default-size="70" :min-size="30">
            <div class="playground__resizable-panel">
              内容区 {{ Math.round(layout[1] ?? 70) }}%
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div class="playground__resizable-example">
        <p class="playground__example-label">
          嵌套、纵向与可折叠面板
        </p>
        <ResizablePanelGroup class="playground__resizable-group" direction="horizontal">
          <ResizablePanel :default-size="45">
            <div class="playground__resizable-panel">
              左侧面板
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel :default-size="55">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                collapsible
                :collapsed-size="12"
                :default-size="35"
                :min-size="25"
              >
                <div class="playground__resizable-panel">
                  可折叠标题区
                </div>
              </ResizablePanel>
              <ResizableHandle with-handle />
              <ResizablePanel :default-size="65">
                <div class="playground__resizable-panel">
                  嵌套内容区
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  </section>
</template>
