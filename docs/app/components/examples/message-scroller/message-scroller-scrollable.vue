<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable
} from 'moriui'
import { computed, defineComponent, h } from 'vue'

interface ScrollMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const messages: ScrollMessage[] = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? 'user' : 'assistant',
  text: index % 2 === 0
    ? `回顾滚动检查点 ${index + 1}。`
    : `检查点 ${index + 1} 已同步。滚动钩子会在视口移动时更新。\n\n当读者位于第一条消息时，底部提示应仅指示向下滚动。一旦进入对话中间，提示应说明两个方向均可。\n\n在最新消息处，提示应再次切换，仅指示向上滚动。`
}))

function getScrollStatus({ start, end }: { start: boolean; end: boolean }): string {
  if (start && end) return '两个方向都可以滚动。'
  if (end) return '已到达顶部，只能向下滚动。'
  if (start) return '已到达底部，只能向上滚动。'
  return '所有消息都适配在视口内。'
}

const ScrollStateFooter = defineComponent({
  setup() {
    const { start, end } = useMessageScrollerScrollable()
    const status = computed(() => getScrollStatus({ start: start.value, end: end.value }))

    return () => h(CardFooter, { class: 'justify-center border-t text-center text-sm text-muted-foreground' }, () => status.value)
  }
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
    <Card class="h-140 w-full gap-0 overflow-hidden">
      <CardHeader class="gap-1 border-b">
        <CardTitle>滚动状态</CardTitle>
        <CardDescription>
          根据当前滚动位置显示读者可以滚动的方向。
        </CardDescription>
      </CardHeader>
      <MessageScrollerProvider default-scroll-position="start">
        <CardContent class="flex-1 overflow-hidden p-0">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent class="gap-4 p-(--card-spacing)">
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
                    <p
                      v-for="(paragraph, pIndex) in message.text.split('\n\n')"
                      :key="pIndex"
                      class="whitespace-pre-wrap"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </CardContent>
        <ScrollStateFooter />
      </MessageScrollerProvider>
    </Card>
    <div class="px-0.5 text-center text-xs text-muted-foreground">
      滚动对话记录查看底部更新。
    </div>
  </div>
</template>
