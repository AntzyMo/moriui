<script setup lang="ts">
import { ArrowUp, Inbox, RotateCw } from '@lucide/vue'
import { computed, ref } from 'vue'
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
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  ToggleGroup,
  ToggleGroupItem
} from 'moriui'

type AnchorRole = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: AnchorRole
  text: string
}

const anchorRole = ref<AnchorRole>('user')
const messages = ref<ChatMessage[]>([])
const messageIndex = ref(0)

const scriptedMessages: ChatMessage[] = [
  {
    id: 'anchor-1-user',
    role: 'user',
    text: '能展示一下当新提示开始时锚定行为是怎样的吗？'
  },
  {
    id: 'anchor-1-assistant',
    role: 'assistant',
    text: '用户提示会先追加，然后追加助理回复。选择"用户"时，提示会稳定在顶部附近，助理回复在其下方填充。'
  },
  {
    id: 'anchor-2-user',
    role: 'user',
    text: '如果助理消息作为锚点会有什么变化？'
  },
  {
    id: 'anchor-2-assistant',
    role: 'assistant',
    text: '每条助理回复都是 `MessageScroller` 保持可见的项目。当回复是你希望读者在每次对话后落脚的位置时，这非常有用。'
  },
  {
    id: 'anchor-3-user',
    role: 'user',
    text: '我能在切换角色后继续添加对话吗？'
  },
  {
    id: 'anchor-3-assistant',
    role: 'assistant',
    text: '可以。下一个追加的所选角色消息会成为锚点，因此你无需重置演示即可比较用户和助理锚定。'
  }
]

const nextMessage = computed(() => scriptedMessages[messageIndex.value])

function sendMessage() {
  if (!nextMessage.value) return
  messages.value = [...messages.value, nextMessage.value]
  messageIndex.value++
}

function resetMessages() {
  messages.value = []
  messageIndex.value = 0
}

function changeAnchorRole(value: string[]) {
  const nextValue = value[0]
  if (nextValue === 'user' || nextValue === 'assistant') {
    anchorRole.value = nextValue
    messages.value = []
    messageIndex.value = 0
  }
}
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <Card class="mx-auto h-140 w-full max-w-sm gap-0">
      <CardHeader class="border-b">
        <CardTitle>锚定对话轮次</CardTitle>
        <CardDescription>
          选择哪个角色在顶部边缘附近固定显示。
        </CardDescription>
        <div class="ms-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="重置锚定消息"
            :disabled="messages.length === 0"
            @click="resetMessages"
          >
            <RotateCw />
          </Button>
        </div>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <div v-if="messages.length === 0" class="h-full">
          <Empty class="h-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Inbox class="size-5" />
              </EmptyMedia>
              <EmptyTitle>暂无锚定消息</EmptyTitle>
              <EmptyDescription>
                发送第一条消息查看所选角色的锚定效果。
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
        <div v-else class="h-full">
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent class="p-(--card-spacing)">
                  <MessageScrollerItem
                    v-for="message in messages"
                    :key="message.id"
                    :message-id="message.id"
                    :scroll-anchor="message.role === anchorRole"
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
          </MessageScrollerProvider>
        </div>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          aria-label="选择滚动锚定角色"
          :model-value="[anchorRole]"
          @update:model-value="changeAnchorRole"
        >
          <ToggleGroupItem value="user" aria-label="锚定用户消息">
            用户
          </ToggleGroupItem>
          <ToggleGroupItem value="assistant" aria-label="锚定助理消息">
            助理
          </ToggleGroupItem>
        </ToggleGroup>
        <Button
          type="button"
          size="icon"
          class="ms-auto"
          :disabled="!nextMessage"
          @click="sendMessage"
        >
          <ArrowUp />
          <span class="sr-only">发送消息</span>
        </Button>
      </CardFooter>
    </Card>
    <div class="mx-auto max-w-xs px-0.5 text-center text-xs text-muted-foreground">
      切换锚定角色，然后发送消息对比轮次的固定位置。
    </div>
  </div>
</template>
