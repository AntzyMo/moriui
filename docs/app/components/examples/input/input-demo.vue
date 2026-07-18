<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'

  const apiKey = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="api-key">
      API 密钥
    </FieldLabel><Input
      id="api-key"
      v-model="apiKey"
      type="password"
      placeholder="sk-…"
    /><FieldDescription>密钥会加密保存。</FieldDescription>
  </Field>
</template>
