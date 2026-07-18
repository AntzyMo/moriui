<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'

  const apiKey = shallowRef('')
</script>

<template>
  <Field dir="rtl" class="w-full max-w-xs">
    <FieldLabel for="rtl-api-key">
      مفتاح API
    </FieldLabel><Input
      id="rtl-api-key"
      v-model="apiKey"
      dir="rtl"
      type="password"
      placeholder="sk-…"
    /><FieldDescription>مفتاح API الخاص بك مشفر ومخزن بأمان.</FieldDescription>
  </Field>
</template>
