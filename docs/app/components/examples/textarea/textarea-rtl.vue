<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Textarea } from 'moriui'

  const feedback = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs" dir="rtl">
    <FieldLabel for="feedback-rtl">
      التعليقات
    </FieldLabel>
    <Textarea
      id="feedback-rtl"
      v-model="feedback"
      dir="rtl"
      placeholder="تعليقاتك تساعدنا على التحسين…"
      rows="4"
    />
    <FieldDescription>شاركنا أفكارك حول خدمتنا.</FieldDescription>
  </Field>
</template>
