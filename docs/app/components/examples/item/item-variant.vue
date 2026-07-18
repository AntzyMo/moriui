<script setup lang="ts">
  import {
    Item,
    ItemContent,
    ItemGroup,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <ItemGroup class="w-full max-w-md">
    <Item role="listitem">
      <ItemContent><ItemTitle>默认条目</ItemTitle></ItemContent>
    </Item>
    <Item role="listitem" variant="outline">
      <ItemContent><ItemTitle>描边条目</ItemTitle></ItemContent>
    </Item>
    <Item role="listitem" variant="muted">
      <ItemContent><ItemTitle>弱化条目</ItemTitle></ItemContent>
    </Item>
  </ItemGroup>
</template>
