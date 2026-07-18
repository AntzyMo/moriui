<script setup lang="ts">
  import { FileText, X } from '@lucide/vue'
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentMedia,
    AttachmentTitle
  } from 'moriui'
</script>

<template>
  <Attachment class="w-full" size="sm">
    <AttachmentMedia><FileText /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>设计规范.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="移除设计规范.pdf">
        <X />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
</template>
