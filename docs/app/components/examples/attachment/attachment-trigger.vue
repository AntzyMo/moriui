<script setup lang="ts">
  import { FileSearch } from '@lucide/vue'
  import {
    Attachment,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger
  } from 'moriui'
</script>

<template>
  <Attachment class="w-full max-w-sm">
    <AttachmentMedia><FileSearch /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>调研摘要.pdf</AttachmentTitle>
      <AttachmentDescription>点击附件打开预览</AttachmentDescription>
    </AttachmentContent>
    <AttachmentTrigger aria-label="预览调研摘要.pdf" />
  </Attachment>
</template>
