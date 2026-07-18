<script setup lang="ts">
  import { Toggle } from 'moriui'
  import { shallowRef } from 'vue'
  import { Bookmark } from '@lucide/vue'

  const bookmarked = shallowRef(false)
</script>

<template>
  <Toggle
    v-model="bookmarked"
    aria-label="تبديل الإشارة المرجعية"
    dir="rtl"
    size="sm"
    variant="outline"
  >
    <Bookmark aria-hidden="true" />إشارة مرجعية
  </Toggle>
</template>
