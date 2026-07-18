<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <Item class="w-full max-w-md">
    <ItemMedia><Avatar><AvatarFallback>林</AvatarFallback></Avatar></ItemMedia><ItemContent><ItemTitle>林森</ItemTitle><ItemDescription>产品设计师</ItemDescription></ItemContent>
  </Item>
</template>
