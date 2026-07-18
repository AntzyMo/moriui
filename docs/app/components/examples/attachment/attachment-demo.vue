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
  <Attachment class="w-full max-w-sm">
    <AttachmentMedia><FileText /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>产品规划.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="移除产品规划.pdf">
        <X />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
</template>
