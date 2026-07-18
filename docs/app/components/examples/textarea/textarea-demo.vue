<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Textarea } from 'moriui'

  const message = shallowRef('')
</script>

<template>
  <Textarea v-model="message" aria-label="消息" placeholder="在这里输入消息…" />
</template>
