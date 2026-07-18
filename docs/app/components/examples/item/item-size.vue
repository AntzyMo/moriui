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
      <ItemContent><ItemTitle>默认尺寸</ItemTitle></ItemContent>
    </Item>
    <Item role="listitem" size="sm">
      <ItemContent><ItemTitle>小尺寸</ItemTitle></ItemContent>
    </Item>
    <Item role="listitem" size="xs">
      <ItemContent><ItemTitle>超小尺寸</ItemTitle></ItemContent>
    </Item>
  </ItemGroup>
</template>
