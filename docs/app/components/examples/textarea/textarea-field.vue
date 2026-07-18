<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Textarea } from 'moriui'

  const message = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="textarea-message">
      消息
    </FieldLabel>
    <FieldDescription>在下方输入需要发送的内容。</FieldDescription>
    <Textarea id="textarea-message" v-model="message" placeholder="在这里输入消息…" />
  </Field>
</template>
