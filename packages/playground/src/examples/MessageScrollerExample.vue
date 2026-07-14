<script setup lang="ts">
  import { computed, onBeforeUnmount, ref } from 'vue'
  import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Marker,
    MarkerContent,
    MarkerIcon,
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerProvider,
    MessageScrollerViewport,
    Spinner
  } from 'moriui'

  import MessageScrollerMessage from './MessageScrollerMessage.vue'

  interface TranscriptItem {
    id: string
    align: 'start' | 'end'
    content: string
    anchor?: boolean
  }

  const messages = ref<TranscriptItem[]>([
    { id: 'm1', align: 'start', content: '你好，我可以帮助你梳理对话界面的滚动体验。', anchor: true },
    { id: 'm2', align: 'end', content: '请给我一个完整的聊天界面示例。', anchor: true },
    { id: 'm3', align: 'start', content: '好的。转录区、滚动容器和输入区会保持各自职责清晰。' }
  ])
  const draft = ref('继续演示 Message Scroller')
  const status = ref<'ready' | 'thinking'>('ready')
  let sequence = 4
  let responseTimer: number | null = null

  const statusLabel = computed(() => status.value === 'thinking' ? '正在生成回复' : '可以继续提问')

  function sendMessage() {
    const content = draft.value.trim()
    if (!content || status.value === 'thinking')
      return
    messages.value.push({ id: `m${sequence++}`, align: 'end', content, anchor: true })
    draft.value = ''
    status.value = 'thinking'
    responseTimer = window.setTimeout(() => {
      messages.value.push({
        id: `m${sequence++}`,
        align: 'start',
        content: '已收到。这条回复由聊天卡片的本地示例状态生成，Message Scroller 只负责保持合适的阅读位置。'
      })
      status.value = 'ready'
      responseTimer = null
    }, 700)
  }

  function stopResponse() {
    if (responseTimer !== null)
      window.clearTimeout(responseTimer)
    responseTimer = null
    status.value = 'ready'
  }

  onBeforeUnmount(stopResponse)
</script>

<template>
  <section class="playground__section">
    <h2>Message Scroller</h2>
    <Card class="h-128 max-w-md gap-0">
      <CardHeader class="gap-1 border-b">
        <CardTitle>对话助手</CardTitle>
        <CardDescription>状态：{{ statusLabel }}</CardDescription>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider auto-scroll>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent class="gap-4 p-4">
                <MessageScrollerMessage
                  v-for="message in messages"
                  :id="message.id"
                  :key="message.id"
                  :align="message.align"
                  :author="message.align === 'end' ? '你' : 'MoriUI 助手'"
                  :content="message.content"
                  :scroll-anchor="message.anchor"
                />
                <MessageScrollerItem v-if="status === 'thinking'" :scroll-anchor="false">
                  <Marker role="status">
                    <MarkerIcon><Spinner /></MarkerIcon>
                    <MarkerContent>正在整理回复…</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter>
        <form class="w-full" @submit.prevent="sendMessage">
          <InputGroup>
            <InputGroupInput v-model="draft" aria-label="消息内容" placeholder="输入一条消息" />
            <InputGroupAddon align="inline-end">
              <Button
                v-if="status === 'thinking'"
                size="icon-sm"
                type="button"
                variant="outline"
                @click="stopResponse"
              >
                停
              </Button>
              <Button v-else size="icon-sm" type="submit">
                发
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </CardFooter>
    </Card>
  </section>
</template>
