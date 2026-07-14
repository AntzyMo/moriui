<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Button,
    Marker,
    MarkerContent,
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport
  } from 'moriui'

  import MessageScrollerMessage from './MessageScrollerMessage.vue'

  const messages = ref([
    { id: 'history-3', align: 'start' as const, content: '这是当前已加载的对话上下文。', anchor: true },
    { id: 'history-4', align: 'end' as const, content: '继续加载更早的消息。', anchor: true },
    { id: 'history-5', align: 'start' as const, content: '前插后，当前阅读行应保持稳定。', anchor: false }
  ])
  const loaded = ref(false)

  function loadHistory() {
    if (loaded.value)
      return
    messages.value.unshift(
      { id: 'history-1', align: 'start', content: '这是一条更早的历史消息。', anchor: false },
      { id: 'history-2', align: 'end', content: '它不会改变你正在阅读的位置。', anchor: false }
    )
    loaded.value = true
  }
</script>

<template>
  <section class="playground__section">
    <h2>Message Scroller · 加载历史</h2>
    <div class="playground__stack">
      <Button
        size="sm"
        variant="outline"
        :disabled="loaded"
        @click="loadHistory"
      >
        {{ loaded ? '历史已加载' : '加载更早消息' }}
      </Button>
      <MessageScrollerProvider default-scroll-position="start">
        <MessageScroller class="h-72 rounded-xl border">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-4 p-4">
              <MessageScrollerItem :scroll-anchor="false">
                <Marker variant="separator">
                  <MarkerContent>今天</MarkerContent>
                </Marker>
              </MessageScrollerItem>
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
      </MessageScrollerProvider>
    </div>
  </section>
</template>
