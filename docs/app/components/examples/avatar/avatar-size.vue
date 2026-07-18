<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback
  } from 'moriui'
</script>

<template>
  <div class="flex items-end gap-3">
    <Avatar size="sm">
      <AvatarFallback>小</AvatarFallback>
    </Avatar><Avatar><AvatarFallback>中</AvatarFallback></Avatar><Avatar size="lg">
      <AvatarFallback>大</AvatarFallback>
    </Avatar>
  </div>
</template>
