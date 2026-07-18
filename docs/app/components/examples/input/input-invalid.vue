<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldError, FieldLabel, Input } from 'moriui'

  const value = shallowRef('error@')
</script>

<template>
  <Field data-invalid class="w-full max-w-xs">
    <FieldLabel for="invalid-email">
      邮箱
    </FieldLabel><Input id="invalid-email" v-model="value" aria-invalid="true" /><FieldError>请输入有效的邮箱地址。</FieldError>
  </Field>
</template>
