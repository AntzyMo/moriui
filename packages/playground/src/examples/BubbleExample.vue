<script setup lang="ts">
  import {
    Bubble,
    BubbleContent,
    BubbleGroup,
    BubbleReactions,
    Button
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Bubble</h2>
    <div class="playground__stack max-w-md">
      <Bubble>
        <BubbleContent>默认气泡用于当前用户的高强调消息。</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>次要气泡适合普通会话内容。</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>弱化气泡可展示系统提示。</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="tinted">
        <BubbleContent>柔和主色能降低发送方消息的强调度。</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>描边气泡适合需要边界的内容。</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>错误或失败操作会使用危险色气泡。</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>幽灵气泡不提供表面，可占满整行来承载较长的助手回复。</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="secondary">
          <BubbleContent>我已经检查完组件导出。</BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>现在正在执行测试与构建。</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble align="end">
        <BubbleContent>完成后告诉我结果。</BubbleContent>
        <BubbleReactions align="start" side="top" aria-label="赞同反应">
          👍
        </BubbleReactions>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>所有检查通过。</BubbleContent>
        <BubbleReactions aria-label="消息操作">
          <Button size="xs" variant="ghost">
            赞
          </Button>
        </BubbleReactions>
      </Bubble>
    </div>
  </section>
</template>
