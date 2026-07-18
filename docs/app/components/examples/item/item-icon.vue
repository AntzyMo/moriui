<script setup lang="ts">
  import { FileText } from '@lucide/vue'
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
    <ItemMedia variant="icon">
      <FileText class="size-4" />
    </ItemMedia><ItemContent><ItemTitle>研究摘要</ItemTitle><ItemDescription>PDF · 2.4 MB</ItemDescription></ItemContent>
  </Item>
</template>
