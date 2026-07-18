<script setup lang="ts">
  import { Check } from '@lucide/vue'
  import {
    Avatar,
    AvatarBadge,
    AvatarFallback
  } from 'moriui'
</script>

<template>
  <Avatar>
    <AvatarFallback>森</AvatarFallback><AvatarBadge aria-label="已验证">
      <Check class="size-3" />
    </AvatarBadge>
  </Avatar>
</template>
