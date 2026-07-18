<script setup lang="ts">
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'
</script>

<template>
  <Field data-disabled class="w-full max-w-xs">
    <FieldLabel for="disabled-email">
      邮箱
    </FieldLabel><Input
      id="disabled-email"
      disabled
      type="email"
      placeholder="Email"
    /><FieldDescription>此字段当前不可编辑。</FieldDescription>
  </Field>
</template>
