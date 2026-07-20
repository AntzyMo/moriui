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
    MessageFooter
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/10.png" alt="@me" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>我快速部署到生产环境。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/02.png" alt="@rabbit" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>现在是周五下午 4:55。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/10.png" alt="@me" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>只是一行代码改动。</BubbleContent>
        </Bubble>
        <MessageFooter>已送达</MessageFooter>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/02.png" alt="@rabbit" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>每次都说只是一行改动 😭。</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>好吧，让我看一下。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
