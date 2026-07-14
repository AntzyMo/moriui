<script setup lang="ts">
  import { onBeforeUnmount, ref } from 'vue'
  import {
    Button,
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerProvider,
    MessageScrollerViewport
  } from 'moriui'

  import MessageScrollerMessage from './MessageScrollerMessage.vue'

  interface StreamMessage {
    id: string
    align: 'start' | 'end'
    content: string
    anchor: boolean
  }

  const messages = ref<StreamMessage[]>([
    { id: 'stream-1', align: 'start' as const, content: '流式回复只会在读者停留于最新消息时持续跟随。', anchor: true }
  ])
  const streaming = ref(false)
  let timer: number | null = null
  let sequence = 2

  function startStream() {
    if (streaming.value)
      return
    const userId = `stream-${sequence++}`
    const assistantId = `stream-${sequence++}`
    messages.value.push({ id: userId, align: 'end', content: '开始一段流式回复', anchor: true })
    messages.value.push({ id: assistantId, align: 'start', content: '', anchor: false })
    streaming.value = true
    const parts = ['正在', '逐段', '生成', '内容，', '并且', '保持', '最新', '回复', '可见。']
    let index = 0
    timer = window.setInterval(() => {
      const message = messages.value.find(item => item.id === assistantId)
      if (!message || index >= parts.length) {
        if (timer !== null)
          window.clearInterval(timer)
        timer = null
        streaming.value = false
        return
      }
      message.content += `${parts[index++]} `
      messages.value = [...messages.value]
    }, 180)
  }

  onBeforeUnmount(() => {
    if (timer !== null)
      window.clearInterval(timer)
  })
</script>

<template>
  <section class="playground__section">
    <h2>Message Scroller · 流式回复</h2>
    <div class="playground__stack">
      <Button
        size="sm"
        variant="outline"
        :disabled="streaming"
        @click="startStream"
      >
        {{ streaming ? '生成中…' : '开始流式回复' }}
      </Button>
      <MessageScrollerProvider auto-scroll>
        <MessageScroller class="h-72 rounded-xl border">
          <MessageScrollerViewport>
            <MessageScrollerContent class="gap-4 p-4">
              <MessageScrollerMessage
                v-for="message in messages"
                :id="message.id"
                :key="message.id"
                :align="message.align"
                :content="message.content || '…'"
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
