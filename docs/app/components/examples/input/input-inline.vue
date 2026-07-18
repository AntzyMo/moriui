<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Button, Field, Input } from 'moriui'

  const query = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs" orientation="horizontal">
    <Input
      v-model="query"
      aria-label="搜索"
      type="search"
      placeholder="搜索…"
    /><Button>搜索</Button>
  </Field>
</template>
