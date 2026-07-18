<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, Textarea } from 'moriui'

  const message = shallowRef('这条消息已锁定。')
</script>

<template>
  <Field class="w-full max-w-xs" data-disabled>
    <FieldLabel for="textarea-disabled">
      消息
    </FieldLabel>
    <Textarea id="textarea-disabled" v-model="message" disabled />
  </Field>
</template>
