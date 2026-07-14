<script setup lang="ts">
  import MessageScrollerMessage from './MessageScrollerMessage.vue'
  import MessageScrollerVisibilityStatus from './MessageScrollerVisibilityStatus.vue'
  import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerProvider, MessageScrollerViewport } from 'moriui'

  const messages = [
    { id: 'visibility-1', align: 'start' as const, content: '第一轮对话的开始。', anchor: true },
    { id: 'visibility-2', align: 'end' as const, content: '第二条消息。', anchor: false },
    { id: 'visibility-3', align: 'start' as const, content: '第二轮对话的开始。', anchor: true },
    { id: 'visibility-4', align: 'end' as const, content: '第四条消息。', anchor: false },
    { id: 'visibility-5', align: 'start' as const, content: '第三轮对话的开始。', anchor: true }
  ]
</script>

<template>
  <section class="playground__section">
    <h2>Message Scroller · 可见性</h2>
    <MessageScrollerProvider default-scroll-position="start" :scroll-margin="12">
      <div class="playground__stack">
        <MessageScrollerVisibilityStatus />
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
