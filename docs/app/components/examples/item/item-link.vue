<script setup lang="ts">
  import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <Item
    as="a"
    href="#item-api"
    class="w-full max-w-md"
    variant="outline"
  >
    <ItemContent><ItemTitle>打开组件 API</ItemTitle><ItemDescription>查看属性与组合方式。</ItemDescription></ItemContent>
  </Item>
</template>
