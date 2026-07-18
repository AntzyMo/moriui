<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'
  import { Bookmark } from '@lucide/vue'

  const bookmarked = shallowRef(false)
</script>

<template>
  <Toggle
    v-model="bookmarked"
    aria-label="切换收藏"
    size="sm"
    variant="outline"
  >
    <Bookmark aria-hidden="true" />收藏
  </Toggle>
</template>
