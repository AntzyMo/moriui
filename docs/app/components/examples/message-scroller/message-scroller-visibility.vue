<script setup lang="ts">
import {
  Bubble,
  BubbleContent,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Message,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility
} from 'moriui'
import { defineComponent, h } from 'vue'

interface VisibilityMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const messages: VisibilityMessage[] = [
  { id: 'vis-brief', role: 'user', text: '请审查事故交接并告诉我应该先阅读什么。' },
  { id: 'vis-brief-asst', role: 'assistant', text: '先从摘要和影响部分开始。回归影响了上传队列，但每个排队作业的恢复路径都已完成。' },
  { id: 'vis-impact', role: 'user', text: '客户受到了什么影响？' },
  { id: 'vis-impact-asst', role: 'assistant', text: '影响仅限于处理延迟。\n\n没有记录丢失，对账工作者确认了每个重试批次。支持团队看到了两位客户的困惑，但没有结账或计费错误。' },
  { id: 'vis-actions', role: 'user', text: '有哪些待办事项？' },
  { id: 'vis-actions-asst', role: 'assistant', text: '在下一次部署之前保持重试窗口启用，然后添加队列深度警报作为长期修复。\n\n警报应在队列持续增长时触发，而不是针对单次短暂峰值。' },
  { id: 'vis-checklist', role: 'user', text: '给我后续检查清单。' },
  { id: 'vis-checklist-asst', role: 'assistant', text: '之后，将队列恢复图与部署时间线进行比较，以便交接清楚地显示处理何时恢复到基线。这样支持团队和工程团队无需重新阅读整个事故线程即可回答相同的客户问题。\n\n我还会在每个后续项目旁边添加简短的责任人备注。清单很小，但明确责任可以防止重试窗口决策、警报调整和支持宏漂移到单独的后续对话中。' }
]

const userMessages = messages.filter(m => m.role === 'user')

const TranscriptOutline = defineComponent({
  setup() {
    const { scrollToMessage } = useMessageScroller()
    const { currentAnchorId } = useMessageScrollerVisibility()

    const dots = userMessages.map(message => {
      const isCurrent = currentAnchorId.value === message.id
      return h('span', {
        key: message.id,
        'data-current': isCurrent ? '' : undefined,
        class: [
          'h-0.5 w-4 rounded-full transition-colors',
          isCurrent ? 'bg-foreground' : 'bg-muted-foreground/40'
        ]
      })
    })

    const outlineItems = userMessages.map(message => {
      const isCurrent = currentAnchorId.value === message.id
      const text = message.text.length > 42 ? message.text.slice(0, 39) + '...' : message.text
      return h('button', {
        key: message.id,
        type: 'button',
        'aria-current': isCurrent ? 'location' : undefined,
        class: [
          'flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none',
          'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
          isCurrent ? 'bg-accent text-accent-foreground' : ''
        ],
        onClick: () => scrollToMessage(message.id, { align: 'start', behavior: 'smooth' })
      }, text)
    })

    return () => h('div', { class: 'absolute top-1/2 -right-12 -translate-y-1/2' }, [
      h(HoverCard, {}, () => [
        h(HoverCardTrigger, { 'aria-label': '打开对话大纲' }, () =>
          h('button', {
            type: 'button',
            'aria-label': '打开对话大纲',
            class: 'flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
          }, dots)
        ),
        h(HoverCardContent, {
          align: 'center',
          side: 'left',
          sideOffset: -28,
          class: 'flex w-64 flex-col gap-1 rounded-2xl p-1'
        }, () => outlineItems)
      ])
    ])
  }
})
</script>

<template>
  <MessageScrollerProvider :scroll-margin="12">
    <div class="relative flex flex-col gap-4">
      <div class="relative mx-auto w-full max-w-sm">
        <Card class="h-140 w-full gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>对话大纲</CardTitle>
            <CardDescription>
              跟踪当前锚定的对话轮次。
            </CardDescription>
          </CardHeader>
          <CardContent class="flex-1 overflow-hidden p-0">
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
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
        </Card>
        <TranscriptOutline />
      </div>
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
        打开大纲可在阅读时跳转到不同的锚定轮次。
      </div>
    </div>
  </MessageScrollerProvider>
</template>
