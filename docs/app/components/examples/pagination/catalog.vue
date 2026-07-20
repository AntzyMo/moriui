<script setup lang="ts">
import { Pagination, PaginationList, PaginationItem } from 'moriui'
</script>
<template>
  <Pagination :total="3"><PaginationList v-slot="{ items }"><PaginationItem v-for="item in items" :key="item.value" :value="item.value" /></PaginationList></Pagination>
</template>
