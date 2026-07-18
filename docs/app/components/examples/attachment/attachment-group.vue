<script setup lang="ts">
  import { FileCode, FileText, Table } from '@lucide/vue'
  import {
    Attachment,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle
  } from 'moriui'

  const files = [
    { name: '需求简报.pdf', meta: 'PDF · 1.4 MB', icon: FileText },
    { name: '客户列表.csv', meta: 'CSV · 18 KB', icon: Table },
    { name: 'renderer.vue', meta: 'Vue · 12 KB', icon: FileCode }
  ]
</script>

<template>
  <AttachmentGroup class="w-full max-w-sm" aria-label="项目附件" tabindex="0">
    <Attachment v-for="file in files" :key="file.name" class="w-64">
      <AttachmentMedia><component :is="file.icon" /></AttachmentMedia>
      <AttachmentContent><AttachmentTitle>{{ file.name }}</AttachmentTitle><AttachmentDescription>{{ file.meta }}</AttachmentDescription></AttachmentContent>
    </Attachment>
  </AttachmentGroup>
</template>
