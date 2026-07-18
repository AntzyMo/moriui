<script setup lang="ts">
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'
</script>

<template>
  <Field class="w-full">
    <FieldLabel for="catalog-email">
      邮箱
    </FieldLabel><Input id="catalog-email" type="email" placeholder="you@example.com" /><FieldDescription>用于接收账户通知。</FieldDescription>
  </Field>
</template>
