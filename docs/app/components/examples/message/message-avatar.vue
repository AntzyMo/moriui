<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    Message,
    MessageAvatar,
    MessageContent
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/03.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>构建在依赖安装阶段失败了。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/10.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>可以分享具体的错误信息吗？</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/03.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>这是日志中的错误信息。</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>构建出现问题，依赖库未正确安装，请尝试重新构建。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
