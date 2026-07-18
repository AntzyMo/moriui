<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'

  const value = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="required-input">
      必填字段 <span aria-hidden="true" class="text-destructive">*</span>
    </FieldLabel><Input id="required-input" v-model="value" required /><FieldDescription>此字段必须填写。</FieldDescription>
  </Field>
</template>
