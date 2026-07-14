<script setup lang="ts">
  import { Download, FileText, X } from '@lucide/vue'
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger,
    Spinner
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Attachment</h2>
    <div class="playground__attachment-examples">
      <div class="playground__attachment-example">
        <p class="playground__example-label">
          文件与操作
        </p>
        <Attachment>
          <AttachmentMedia>
            <FileText aria-hidden="true" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction
              as="a"
              href="#attachment-download"
              aria-label="下载 sales-dashboard.pdf"
              size="icon-sm"
              variant="secondary"
            >
              <Download aria-hidden="true" />
            </AttachmentAction>
            <AttachmentAction aria-label="移除 sales-dashboard.pdf">
              <X aria-hidden="true" />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger as-child>
            <a href="#attachment-preview" aria-label="预览 sales-dashboard.pdf" />
          </AttachmentTrigger>
        </Attachment>
      </div>

      <div class="playground__attachment-example">
        <p class="playground__example-label">
          图片预览
        </p>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <img
              alt="办公室会议空间"
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop&q=80"
            >
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>workspace.png</AttachmentTitle>
            <AttachmentDescription>PNG · 1.8 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </div>

      <div class="playground__attachment-example">
        <p class="playground__example-label">
          上传状态
        </p>
        <div class="playground__attachment-states">
          <Attachment state="idle" size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>draft.docx</AttachmentTitle>
              <AttachmentDescription>等待上传</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="uploading" size="sm">
            <AttachmentMedia>
              <Spinner aria-label="正在上传" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>product-assets.zip</AttachmentTitle>
              <AttachmentDescription>正在上传</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="error" size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>invoice.pdf</AttachmentTitle>
              <AttachmentDescription>上传失败，请重试</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="移除 invoice.pdf">
                <X aria-hidden="true" />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>

      <div class="playground__attachment-example">
        <p class="playground__example-label">
          横向分组
        </p>
        <AttachmentGroup class="playground__attachment-group">
          <Attachment size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>brief.pdf</AttachmentTitle>
              <AttachmentDescription>820 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>notes.txt</AttachmentTitle>
              <AttachmentDescription>12 KB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>archive.zip</AttachmentTitle>
              <AttachmentDescription>5.6 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </div>
    </div>
  </section>
</template>
