<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldContent, FieldDescription, FieldLabel, Switch } from 'moriui'

  const shared = shallowRef(false)
</script>

<template>
  <Field class="max-w-sm" dir="rtl" orientation="horizontal">
    <FieldContent>
      <FieldLabel for="switch-focus-mode-rtl">
        المشاركة عبر الأجهزة
      </FieldLabel>
      <FieldDescription>تتم مزامنة حالة التركيز مع أجهزتك.</FieldDescription>
    </FieldContent>
    <Switch id="switch-focus-mode-rtl" v-model="shared" />
  </Field>
</template>
