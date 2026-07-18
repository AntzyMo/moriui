<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent,
    BubbleGroup
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <BubbleGroup class="w-full max-w-md">
    <Bubble align="start">
      <BubbleContent>来自协作者</BubbleContent>
    </Bubble><Bubble align="end" variant="secondary">
      <BubbleContent>来自当前用户</BubbleContent>
    </Bubble>
  </BubbleGroup>
</template>
