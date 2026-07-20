<script setup lang="ts">
  import { Copy, RefreshCcw, ThumbsDown, ThumbsUp } from '@lucide/vue'
  import {
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    MessageFooter
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>安装失败的原因在于工作区依赖。</BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon" aria-label="复制" title="复制">
            <Copy />
          </Button>
          <Button variant="ghost" size="icon" aria-label="赞同" title="赞同">
            <ThumbsUp />
          </Button>
          <Button variant="ghost" size="icon" aria-label="反对" title="反对">
            <ThumbsDown />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>好的，把链接发给我，我看一下……</BubbleContent>
        </Bubble>
        <MessageFooter class="gap-2">
          <span class="font-normal text-destructive">发送失败</span>
          <Button variant="ghost" size="icon-xs" title="重试" aria-label="重试">
            <RefreshCcw />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
