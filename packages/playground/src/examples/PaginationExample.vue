<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationList,
    PaginationNext,
    PaginationPrev
  } from 'moriui'

  const page = ref(5)
</script>

<template>
  <section class="playground__section">
    <h2>Pagination</h2>
    <div class="playground__pagination-example">
      <Pagination
        v-model:page="page"
        :items-per-page="10"
        :total="100"
        show-edges
      >
        <PaginationList #default="{ items }">
          <PaginationPrev />
          <template v-for="(item, index) in items" :key="`${item.type}-${index}`">
            <PaginationItem v-if="item.type === 'page'" :value="item.value" />
            <PaginationEllipsis v-else />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
      <output class="playground__example-label">
        当前页：{{ page }}
      </output>
    </div>
  </section>
</template>
