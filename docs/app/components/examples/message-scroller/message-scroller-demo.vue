<script setup lang="ts">
import { ArrowUp, Inbox, RotateCw } from '@lucide/vue'
import { ref } from 'vue'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  InputGroup,
  InputGroupButton,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from 'moriui'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const messages = ref<ChatMessage[]>([])
const inputText = ref('')
const isBusy = ref(false)

function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isBusy.value) return

  inputText.value = ''
  const userMsg: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'user',
    text
  }
  messages.value = [...messages.value, userMsg]
  simulateReply()
}

function simulateReply() {
  isBusy.value = true
  setTimeout(() => {
    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      text: getDemoReply(messages.value.length)
    }
    messages.value = [...messages.value, assistantMsg]
    isBusy.value = false
  }, 800)
}

function resetConversation() {
  messages.value = []
  isBusy.value = false
}

function getDemoReply(count: number): string {
  const replies = [
    '这是一个很好的问题。`MessageScroller` 会自动管理滚动位置，让新消息始终可见。',
    '当用户滚动查看历史消息时，自动滚动会暂停，不会打扰阅读体验。',
    `你可以自定义滚动锚点，让特定消息在视图顶部附近固定显示。`,
    '`MessageScrollerButton` 会在新消息到达时出现在底部，点击即可跳转到最新消息。'
  ]
  return replies[(count - 1) % replies.length]
}
</script>

<template>
  <MessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>新对话</CardTitle>
          <CardDescription>今天有什么可以帮助你的？</CardDescription>
          <div class="ms-auto">
            <Button
              variant="outline"
              size="icon"
              aria-label="重置对话"
              :disabled="messages.length === 0 || isBusy"
              @click="resetConversation"
            >
              <RotateCw />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 overflow-hidden p-0">
          <div v-if="messages.length === 0" class="h-full">
            <Empty class="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Inbox class="size-5" />
                </EmptyMedia>
                <EmptyTitle>开始对话</EmptyTitle>
                <EmptyDescription>
                  输入消息并按发送开始对话。
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
          <div v-else class="h-full">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent class="p-(--card-spacing)">
                  <MessageScrollerItem
                    v-for="message in messages"
                    :key="message.id"
                    :message-id="message.id"
                    :scroll-anchor="message.role === 'user'"
                    class="flex flex-col gap-2"
                  >
                    <div
                      :class="[
                        'rounded-2xl px-4 py-2.5 text-sm max-w-[80%]',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ms-auto'
                          : 'bg-muted text-muted-foreground me-auto'
                      ]"
                    >
                      {{ message.text }}
                    </div>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </div>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <form class="w-full flex gap-2" @submit.prevent="sendMessage">
            <InputGroup class="w-full">
              <input
                v-model="inputText"
                type="text"
                placeholder="输入消息..."
                :disabled="isBusy"
                class="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <InputGroupButton
                type="submit"
                variant="default"
                size="icon-sm"
                :disabled="!inputText.trim() || isBusy"
                class="ms-auto"
              >
                <ArrowUp />
                <span class="sr-only">发送</span>
              </InputGroupButton>
            </InputGroup>
          </form>
        </CardFooter>
      </Card>
      <div class="px-0.5 text-center text-xs text-muted-foreground">
        演示为只读预览。输入消息开始对话。
      </div>
    </div>
  </MessageScrollerProvider>
</template>
