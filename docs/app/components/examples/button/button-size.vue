<script setup lang="ts">
  import { Button } from 'moriui'
  import { ArrowUpRight } from '@lucide/vue'
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Button size="xs" variant="outline">
      超小
    </Button>
    <Button size="sm" variant="outline">
      小号
    </Button>
    <Button variant="outline">
      默认
    </Button>
    <Button size="lg" variant="outline">
      大号
    </Button>
    <Button size="icon" variant="outline" aria-label="打开">
      <ArrowUpRight />
    </Button>
  </div>
</template>
