<script setup lang="ts">
  import { Check, Clock, FileWarning, LoaderCircle } from '@lucide/vue'
  import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-2">
    <Attachment state="idle">
      <AttachmentMedia><Clock /></AttachmentMedia><AttachmentContent><AttachmentTitle>待上传.pdf</AttachmentTitle><AttachmentDescription>等待上传</AttachmentDescription></AttachmentContent>
    </Attachment>
    <Attachment state="uploading">
      <AttachmentMedia><LoaderCircle class="animate-spin" /></AttachmentMedia><AttachmentContent><AttachmentTitle>设计系统.zip</AttachmentTitle><AttachmentDescription>上传中 · 64%</AttachmentDescription></AttachmentContent>
    </Attachment>
    <Attachment state="error">
      <AttachmentMedia><FileWarning /></AttachmentMedia><AttachmentContent><AttachmentTitle>财务模型.xlsx</AttachmentTitle><AttachmentDescription>上传失败，请重试。</AttachmentDescription></AttachmentContent>
    </Attachment>
    <Attachment state="done">
      <AttachmentMedia><Check /></AttachmentMedia><AttachmentContent><AttachmentTitle>调研报告.pdf</AttachmentTitle><AttachmentDescription>已上传 · 1.8 MB</AttachmentDescription></AttachmentContent>
    </Attachment>
  </div>
</template>
