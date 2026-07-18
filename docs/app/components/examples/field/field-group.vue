<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet
  } from 'moriui'

  const taskEmail = shallowRef(false)
</script>

<template>
  <FieldGroup class="w-full max-w-xs">
    <FieldSet>
      <FieldLabel>长任务</FieldLabel><FieldDescription>研究或图片生成完成时通知我。</FieldDescription><Field orientation="horizontal">
        <Checkbox id="push" disabled :model-value="true" /><FieldLabel for="push">
          推送通知
        </FieldLabel>
      </Field>
    </FieldSet>
    <FieldSeparator />
    <FieldSet>
      <FieldLabel>任务更新</FieldLabel><FieldDescription>任务状态变化时通知我。</FieldDescription><Field orientation="horizontal">
        <Checkbox id="task-email" v-model="taskEmail" /><FieldLabel for="task-email">
          邮件通知
        </FieldLabel>
      </Field>
    </FieldSet>
  </FieldGroup>
</template>
