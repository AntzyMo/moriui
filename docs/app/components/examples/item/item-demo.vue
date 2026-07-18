<script setup lang="ts">
  import { FileText } from '@lucide/vue'
  import {
    Badge,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <Item class="w-full max-w-md">
    <ItemMedia variant="icon">
      <FileText class="size-4" />
    </ItemMedia><ItemContent><ItemTitle>组件规范.md</ItemTitle><ItemDescription>今天 12:30 更新</ItemDescription></ItemContent><ItemActions>
      <Badge variant="secondary">
        已同步
      </Badge>
    </ItemActions>
  </Item>
</template>
