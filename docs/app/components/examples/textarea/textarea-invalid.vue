<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldError, FieldLabel, Textarea } from 'moriui'

  const message = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs" data-invalid>
    <FieldLabel for="textarea-invalid">
      消息
    </FieldLabel>
    <Textarea
      id="textarea-invalid"
      v-model="message"
      aria-invalid="true"
      placeholder="在这里输入消息…"
    />
    <FieldError>请输入有效的消息。</FieldError>
  </Field>
</template>
