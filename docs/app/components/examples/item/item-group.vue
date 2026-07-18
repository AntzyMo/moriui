<script setup lang="ts">
  import {
    Item,
    ItemContent,
    ItemGroup,
    ItemSeparator,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <ItemGroup class="w-full max-w-md">
    <Item role="listitem">
      <ItemContent><ItemTitle>账户设置</ItemTitle></ItemContent>
    </Item>
    <ItemSeparator aria-hidden="true" />
    <Item role="listitem">
      <ItemContent><ItemTitle>通知偏好</ItemTitle></ItemContent>
    </Item>
  </ItemGroup>
</template>
