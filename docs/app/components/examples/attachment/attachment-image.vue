<script setup lang="ts">
  import { ExternalLink } from '@lucide/vue'
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger
  } from 'moriui'
</script>

<template>
  <Attachment class="w-full max-w-sm" orientation="vertical">
    <AttachmentMedia variant="image">
      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="明亮的共享工作区">
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>工作区参考图.jpg</AttachmentTitle>
      <AttachmentDescription>JPG · 1.1 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="在新窗口打开工作区参考图">
        <ExternalLink />
      </AttachmentAction>
    </AttachmentActions>
    <AttachmentTrigger as="a" href="#" aria-label="预览工作区参考图" />
  </Attachment>
</template>
