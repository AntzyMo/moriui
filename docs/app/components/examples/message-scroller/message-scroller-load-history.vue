<script setup lang="ts">
import { RotateCw } from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  Bubble,
  BubbleContent,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Marker,
  MarkerContent,
  Message,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport
} from 'moriui'

interface HistoryMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const history: HistoryMessage[] = [
  { id: 'h-1-user', role: 'user', text: '能否总结一下事故频道的情况？' },
  { id: 'h-1-assistant', role: 'assistant', text: '第一个警报是延迟的导出作业。它大约在 09:42 UTC 开始积压，一旦重试队列超过阈值就触发了警告。\n\n没有客户结账路径受到影响，但较大工作区的导出运行延迟了约 12 分钟。' },
  { id: 'h-2-user', role: 'user', text: '结账功能受到影响了吗？' },
  { id: 'h-2-assistant', role: 'assistant', text: '没有报告结账错误。支付授权、订单创建和确认邮件都保持在正常延迟范围内。\n\n唯一升高的指标是导出队列深度，这对应的是分析下载而不是结账。' },
  { id: 'h-3-user', role: 'user', text: '上次部署改了什么？' },
  { id: 'h-3-assistant', role: 'assistant', text: '只修改了导出队列工作者。此次部署将大型 CSV 作业移到了共享重试策略上，这使得每次失败尝试占用的工作线程时间比以前更长。\n\n应用部署不包括结账、定价或计费 API 的更改。' },
  { id: 'h-4-user', role: 'user', text: '我们需要回滚吗？' },
  { id: 'h-4-assistant', role: 'assistant', text: '暂时不用。在我们降低重试并发后，队列深度正在恢复，最旧的待处理作业现在不到五分钟。\n\n如果队列再次开始攀升，请准备好回滚，但当前趋势指向恢复。' },
  { id: 'h-5-user', role: 'user', text: '继续关注客户可见的问题。' },
  { id: 'h-5-assistant', role: 'assistant', text: '我将继续关注队列和支持标签 15 分钟。我会跟踪导出失败、延迟的下载请求以及任何提到缺失报告的支持线程。\n\n如果这些问题在下一个批次窗口期间保持平静，我们可以将此事件关闭为内部降级。' }
]

const INITIAL_VISIBLE_COUNT = 5
const visibleCount = ref(INITIAL_VISIBLE_COUNT)
const isLoadingMessage = ref('')
const demoKey = ref(0)

const visibleMessages = computed(() => history.slice(-visibleCount.value))
const canLoadHistory = computed(() => visibleCount.value < history.length)

function loadHistory() {
  visibleCount.value = history.length
  isLoadingMessage.value = '已加载全部历史记录，向上滚动查看早期消息。'
  setTimeout(() => { isLoadingMessage.value = '' }, 3000)
}

function resetHistory() {
  visibleCount.value = INITIAL_VISIBLE_COUNT
  isLoadingMessage.value = ''
  demoKey.value++
}
</script>

<template>
  <MessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>加载历史</CardTitle>
          <CardDescription>
            前置追加的消息会保留滚动位置。
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="重置已加载消息"
              :disabled="visibleCount === INITIAL_VISIBLE_COUNT"
              @click="resetHistory"
            >
              <RotateCw />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent class="flex-1 overflow-hidden p-0">
          <MessageScroller :key="`history-${demoKey}`">
            <MessageScrollerViewport>
              <MessageScrollerContent class="p-(--card-spacing)">
                <MessageScrollerItem
                  v-for="message in visibleMessages"
                  :key="message.id"
                  :message-id="message.id"
                  class="flex flex-col gap-2"
                >
                  <Message :align="message.role === 'user' ? 'end' : 'start'">
                    <MessageContent>
                      <Bubble :variant="message.role === 'user' ? 'muted' : 'ghost'">
                        <BubbleContent class="space-y-2">
                          <p
                            v-for="(paragraph, pIndex) in message.text.split('\n\n')"
                            :key="pIndex"
                            class="whitespace-pre-wrap text-sm"
                          >
                            {{ paragraph }}
                          </p>
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
                <MessageScrollerItem :scroll-anchor="false">
                  <Marker variant="separator">
                    <MarkerContent>对话结束</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </CardContent>
        <CardFooter class="flex-col items-center gap-2 border-t">
          <Button
            type="button"
            :disabled="!canLoadHistory"
            @click="loadHistory"
            class="w-full"
            variant="secondary"
          >
            {{ canLoadHistory ? '加载历史记录' : '已加载全部' }}
          </Button>
          <p class="text-xs text-muted-foreground">
            {{ isLoadingMessage || '恢复早期消息同时保留滚动位置。' }}
          </p>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
        点击加载历史按钮查看完整对话。
      </div>
    </div>
  </MessageScrollerProvider>
</template>
