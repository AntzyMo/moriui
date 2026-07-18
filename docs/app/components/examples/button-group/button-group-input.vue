<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Search } from '@lucide/vue'
  import { Button, ButtonGroup, Input } from 'moriui'

  const query = shallowRef('')
</script>

<template>
  <ButtonGroup>
    <Input v-model="query" aria-label="搜索" placeholder="搜索…" />
    <Button variant="outline" aria-label="提交搜索">
      <Search />
    </Button>
  </ButtonGroup>
</template>
