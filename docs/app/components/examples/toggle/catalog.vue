<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'
  import { Bookmark } from '@lucide/vue'

  const bookmarked = shallowRef(true)
</script>

<template>
  <Toggle
    v-model="bookmarked"
    aria-label="收藏"
    size="sm"
    variant="outline"
  >
    <Bookmark aria-hidden="true" />收藏
  </Toggle>
</template>
