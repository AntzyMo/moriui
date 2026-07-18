<script setup lang="ts">
  import { FileText } from '@lucide/vue'
  import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <Attachment><AttachmentMedia><FileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>默认附件</AttachmentTitle><AttachmentDescription>PDF · 2.4 MB</AttachmentDescription></AttachmentContent></Attachment>
    <Attachment size="sm">
      <AttachmentMedia><FileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>小号附件</AttachmentTitle><AttachmentDescription>PDF · 2.4 MB</AttachmentDescription></AttachmentContent>
    </Attachment>
    <Attachment size="xs">
      <AttachmentMedia><FileText /></AttachmentMedia><AttachmentContent><AttachmentTitle>超小附件</AttachmentTitle></AttachmentContent>
    </Attachment>
  </div>
</template>
