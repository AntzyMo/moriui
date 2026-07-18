<script setup lang="ts">
  import {
    Avatar,
    AvatarFallback,
    Button
  } from 'moriui'
</script>

<template>
  <Button
    type="button"
    size="icon"
    variant="ghost"
    class="rounded-full"
    aria-label="打开账户菜单"
  >
    <Avatar><AvatarFallback>森</AvatarFallback></Avatar>
  </Button>
</template>
