<script setup lang="ts">
  import {
    Bubble,
    BubbleContent,
    Message,
    MessageContent,
    MessageFooter,
    MessageHeader
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message>
      <MessageContent>
        <MessageHeader>Olivia</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>我已经检查过日志了。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>把报告发送给团队。需要帮助的话联系 @shadcn。</BubbleContent>
        </Bubble>
        <MessageFooter>
          <div>
            已读 · <span class="font-normal">昨天</span>
          </div>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
