<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Bubble,
    BubbleContent,
    Button
  } from 'moriui'

  const expanded = ref(false)
</script>

<template>
  <Bubble variant="tinted">
    <BubbleContent>
      文档已经更新。<a href="#bubble-api" class="underline underline-offset-4">查看 API</a><Button class="ml-2" size="xs">
        确认
      </Button>
    </BubbleContent>
  </Bubble>
</template>
