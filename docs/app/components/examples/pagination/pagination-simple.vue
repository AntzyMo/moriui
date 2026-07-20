<script setup lang="ts">
import { Pagination, PaginationList, PaginationItem } from 'moriui'
</script>
<template>
  <Pagination :total="5" :default-page="2">
    <PaginationList v-slot="{ items }">
      <template v-for="item in items" :key="item.type === 'page' ? item.value : 'ellipsis'">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" />
      </template>
    </PaginationList>
  </Pagination>
</template>
