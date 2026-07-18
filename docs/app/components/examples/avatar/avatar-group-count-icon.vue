<script setup lang="ts">
  import { Users } from '@lucide/vue'
  import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount
  } from 'moriui'
</script>

<template>
  <AvatarGroup>
    <Avatar><AvatarFallback>林</AvatarFallback></Avatar><Avatar><AvatarFallback>周</AvatarFallback></Avatar><AvatarGroupCount aria-label="查看全部成员">
      <Users class="size-4" />
    </AvatarGroupCount>
  </AvatarGroup>
</template>
