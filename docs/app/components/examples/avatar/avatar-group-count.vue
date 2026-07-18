<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount
  } from 'moriui'
</script>

<template>
  <AvatarGroup>
    <Avatar><AvatarFallback>林</AvatarFallback></Avatar><Avatar><AvatarFallback>周</AvatarFallback></Avatar><AvatarGroupCount aria-label="另有 3 位成员">
      +3
    </AvatarGroupCount>
  </AvatarGroup>
</template>
