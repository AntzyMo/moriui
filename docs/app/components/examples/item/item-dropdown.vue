<script setup lang="ts">
  import { User } from '@lucide/vue'
  import {
    Button,
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
      <User class="size-4" />
    </ItemMedia><ItemContent><ItemTitle>协作者</ItemTitle><ItemDescription>管理成员权限</ItemDescription></ItemContent><ItemActions>
      <Button size="sm" variant="ghost" aria-label="更多成员操作">
        更多
      </Button>
    </ItemActions>
  </Item>
</template>
