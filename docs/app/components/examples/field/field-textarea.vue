<script setup lang="ts">
  import { Field, FieldDescription, FieldLabel, Textarea } from 'moriui'
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="feedback">
      反馈
    </FieldLabel><Textarea id="feedback" rows="4" placeholder="你的建议会帮助我们改进…" /><FieldDescription>请描述遇到的问题或建议。</FieldDescription>
  </Field>
</template>
