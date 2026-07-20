<script setup lang="ts">
import { Pagination, PaginationList, PaginationEllipsis, PaginationItem, PaginationPrev, PaginationNext } from 'moriui'
</script>
<template>
  <Pagination :total="100">
    <PaginationList v-slot="{ items }">
      <PaginationPrev />
      <template v-for="item in items" :key="item.type === 'page' ? item.value : 'ellipsis'">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" />
        <PaginationEllipsis v-else />
      </template>
      <PaginationNext />
    </PaginationList>
  </Pagination>
</template>
