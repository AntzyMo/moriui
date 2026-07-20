<script setup lang="ts">
import { ArrowUp, Inbox, RotateCw } from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  Button,
  Card,
  CardAction,
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
  MessageScrollerProvider,
  MessageScrollerViewport
} from 'moriui'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

interface StreamStage {
  messages: ChatMessage[]
  pendingText?: string
}

const isStreaming = ref(false)

const stages: StreamStage[] = [
  {
    messages: []
  },
  {
    messages: [
      { id: 's-1-user', role: 'user', text: '我在为我们的应用构建聊天功能，滚动行为让我很头疼。每次 AI 流式回复时，整个对话线程都在跳动。' }
    ]
  },
  {
    messages: [
      { id: 's-1-user', role: 'user', text: '我在为我们的应用构建聊天功能，滚动行为让我很头疼。每次 AI 流式回复时，整个对话线程都在跳动。' },
      { id: 's-1-assistant', role: 'assistant', text: '这就是经典的流式滚动问题。将消息列表包裹在 `MessageScroller` 中并启用 autoScroll——视口会固定在底部，让用户始终看到最新的文本内容。\n\n重要的是：它只在阅读器已经在底部时才自动滚动。当用户向上滚动查看之前的内容时，自动滚动会暂停，保留用户的阅读位置。' }
    ]
  },
  {
    messages: [
      { id: 's-1-user', role: 'user', text: '我在为我们的应用构建聊天功能，滚动行为让我很头疼。每次 AI 流式回复时，整个对话线程都在跳动。' },
      { id: 's-1-assistant', role: 'assistant', text: '这就是经典的流式滚动问题。将消息列表包裹在 `MessageScroller` 中并启用 autoScroll——视口会固定在底部，让用户始终看到最新的文本内容。\n\n重要的是：它只在阅读器已经在底部时才自动滚动。当用户向上滚动查看之前的内容时，自动滚动会暂停，保留用户的阅读位置。' },
      { id: 's-2-user', role: 'user', text: '但如果用户向上滚动查看之前的回复呢？我不想把他们拉回来。' }
    ]
  },
  {
    messages: [
      { id: 's-1-user', role: 'user', text: '我在为我们的应用构建聊天功能，滚动行为让我很头疼。每次 AI 流式回复时，整个对话线程都在跳动。' },
      { id: 's-1-assistant', role: 'assistant', text: '这就是经典的流式滚动问题。将消息列表包裹在 `MessageScroller` 中并启用 autoScroll——视口会固定在底部，让用户始终看到最新的文本内容。\n\n重要的是：它只在阅读器已经在底部时才自动滚动。当用户向上滚动查看之前的内容时，自动滚动会暂停，保留用户的阅读位置。' },
      { id: 's-2-user', role: 'user', text: '但如果用户向上滚动查看之前的回复呢？我不想把他们拉回来。' },
      { id: 's-2-assistant', role: 'assistant', text: '自动滚动只在视口固定在底部时运行，因此向上滚动是有意退出——即使用户未读的新消息不断到达，他们在对话中的位置也会保持不变。\n\n当有未读内容时，`MessageScrollerButton` 会出现在视口底部。点击即可跳转到最新消息并重新启用自动滚动。' }
    ]
  }
]

const currentStage = ref(0)
const messages = ref<ChatMessage[]>([])

const isBusy = computed(() => isStreaming.value)
const hasNext = computed(() => currentStage.value < stages.length - 1)

function advanceStage() {
  if (currentStage.value >= stages.length - 1) return
  isStreaming.value = true
  currentStage.value++

  // Simulate streaming by showing the next stage after a delay
  setTimeout(() => {
    messages.value = stages[currentStage.value].messages
    isStreaming.value = false
  }, 600)
}

function resetStream() {
  currentStage.value = 0
  messages.value = []
  isStreaming.value = false
}
</script>

<template>
  <MessageScrollerProvider auto-scroll>
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>流式消息</CardTitle>
          <CardDescription>
            自动滚动跟随对话的最新边缘。
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              size="icon"
              aria-label="重置流式演示"
              :disabled="messages.length === 0 || isBusy"
              @click="resetStream"
            >
              <RotateCw />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent class="flex-1 overflow-hidden p-0">
          <div v-if="messages.length === 0" class="h-full">
            <Empty class="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Inbox class="size-5" />
                </EmptyMedia>
                <EmptyTitle>准备流式播放</EmptyTitle>
                <EmptyDescription>
                  点击发送按钮查看模拟的流式对话。
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
          <div v-else class="h-full">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  :aria-busy="isBusy.toString()"
                  class="p-(--card-spacing)"
                >
                  <MessageScrollerItem
                    v-for="message in messages"
                    :key="message.id"
                    :message-id="message.id"
                    :scroll-anchor="message.role === 'user'"
                    class="flex flex-col gap-2"
                  >
                    <div
                      :class="[
                        'rounded-2xl px-4 py-2.5 text-sm max-w-[80%] whitespace-pre-wrap',
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
          <InputGroup class="w-full">
            <div class="flex h-14 w-full items-center px-3 py-2.5">
              <span
                class="line-clamp-2 text-sm opacity-60"
                :class="{ 'opacity-100': !hasNext }"
              >
                <span v-if="hasNext" class="text-muted-foreground">
                  点击发送添加下一组消息。
                </span>
                <span v-else class="text-muted-foreground">
                  演示已结束。重置可重新播放。
                </span>
              </span>
            </div>
            <InputGroupButton
              type="button"
              variant="default"
              size="icon-sm"
              :disabled="!hasNext || isBusy"
              class="ms-auto"
              @click="advanceStage"
            >
              <ArrowUp />
              <span class="sr-only">发送</span>
            </InputGroupButton>
          </InputGroup>
        </CardFooter>
      </Card>
      <div class="px-0.5 text-center text-xs text-muted-foreground">
        流式为模拟效果。已启用 `autoScroll`。
      </div>
    </div>
  </MessageScrollerProvider>
</template>
