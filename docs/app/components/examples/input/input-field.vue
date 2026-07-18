<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'

  const username = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="input-username">
      用户名
    </FieldLabel><Input id="input-username" v-model="username" placeholder="输入用户名" /><FieldDescription>请选择唯一的用户名。</FieldDescription>
  </Field>
</template>
