<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    Message,
    MessageAvatar,
    MessageContent,
    MessageGroup
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <MessageGroup>
      <Message>
        <MessageAvatar />
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>我已经检查过注册表地址了。</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/avatars/02.png" alt="@avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>组件和示例 JSON 已经部署到 UI 注册表中。</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  </div>
</template>
