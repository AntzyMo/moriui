<script setup lang="ts">
  import {
    Bubble,
    BubbleContent,
    Message,
    MessageContent
  } from 'moriui'

  const response = `以下是在消息中渲染 Markdown 的方法：

1. 将助手的文本通过 **Markdown** 组件渲染。
2. 用户消息保持纯文本形式。
3. 使用 \`ghost\` 气泡使回复无边框显示。`
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>
            如何在消息中渲染 Markdown？
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent>
        <Bubble variant="ghost">
          <BubbleContent>
            <!-- 实际项目中使用 Markdown 组件渲染，此处为静态演示 -->
            {{ response }}
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
