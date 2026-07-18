<script setup lang="ts">
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle
  } from 'moriui'
</script>

<template>
  <Empty dir="rtl" class="w-full max-w-md">
    <EmptyHeader><EmptyTitle>لا توجد نتائج</EmptyTitle><EmptyDescription>جرّب تعديل كلمات البحث.</EmptyDescription></EmptyHeader>
  </Empty>
</template>
