<script setup lang="ts">
  import { Download, FileText } from '@lucide/vue'
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    Bubble,
    BubbleContent,
    Message,
    MessageContent
  } from 'moriui'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message align="end">
      <MessageContent>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
              alt="办公空间"
            >
          </AttachmentMedia>
        </Attachment>
        <Bubble>
          <BubbleContent>
            这是图片，可以把它加进 PDF 作为封面页吗？
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            已完成，这是添加了封面图片的 PDF。
          </BubbleContent>
        </Bubble>
        <Attachment>
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>数据看板.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              type="button"
              title="下载"
              aria-label="下载"
              size="icon-sm"
              variant="secondary"
            >
              <Download />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>谢谢，看起来不错。</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  </div>
</template>
