<script setup lang="ts">
  import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <Item class="w-full max-w-md">
    <ItemMedia variant="image">
      <div class="size-full rounded-md bg-gradient-to-br from-muted to-secondary" role="img" aria-label="项目封面" />
    </ItemMedia><ItemContent><ItemTitle>Nova 控制台</ItemTitle><ItemDescription>设计系统项目</ItemDescription></ItemContent>
  </Item>
</template>
