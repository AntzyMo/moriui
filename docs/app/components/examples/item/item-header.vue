<script setup lang="ts">
  import {
    Badge,
    Item,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <Item class="w-full max-w-md" variant="outline">
    <ItemHeader>
      <Badge variant="secondary">
        文档
      </Badge><span class="text-xs text-muted-foreground">3 分钟前</span>
    </ItemHeader><ItemContent><ItemTitle>发布检查清单</ItemTitle><ItemDescription>完成类型检查与可访问性验证。</ItemDescription></ItemContent>
  </Item>
</template>
