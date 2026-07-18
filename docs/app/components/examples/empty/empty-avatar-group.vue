<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty class="w-full max-w-md">
    <EmptyHeader><EmptyMedia><AvatarGroup><Avatar><AvatarFallback>林</AvatarFallback></Avatar><Avatar><AvatarFallback>周</AvatarFallback></Avatar><AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup></EmptyMedia><EmptyTitle>等待更多成员</EmptyTitle></EmptyHeader>
  </Empty>
</template>
