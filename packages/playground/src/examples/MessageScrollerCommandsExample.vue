<script setup lang="ts">
  import MessageScrollerMessage from './MessageScrollerMessage.vue'
  import MessageScrollerCommandControls from './MessageScrollerCommandControls.vue'
  import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerProvider, MessageScrollerViewport } from 'moriui'

  const messages = [
    { id: 'command-1', align: 'start' as const, content: '第一条：命令可以回到转录开头。', anchor: true },
    { id: 'command-2', align: 'end' as const, content: '第二条：也可以将指定消息置于视口中央。', anchor: true },
    { id: 'command-3', align: 'start' as const, content: '第三条：最后回到最新消息。', anchor: false },
    { id: 'command-4', align: 'start' as const, content: '第四条：每个可定位行都有稳定 messageId。', anchor: false }
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Message Scroller · 滚动命令</h2>
    <MessageScrollerProvider default-scroll-position="start">
      <div class="playground__stack">
        <MessageScrollerCommandControls />
        <MessageScroller class="h-72 rounded-xl border">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-4 p-4">
              <MessageScrollerMessage
                v-for="message in messages"
                :id="message.id"
                :key="message.id"
                :align="message.align"
                :content="message.content"
                :scroll-anchor="message.anchor"
              />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  </section>
</template>
