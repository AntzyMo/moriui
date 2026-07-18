<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <Bubble><BubbleContent>你好，MoriUI。</BubbleContent></Bubble>
</template>
