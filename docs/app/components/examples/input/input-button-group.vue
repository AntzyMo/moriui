<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Button, ButtonGroup, Field, FieldLabel, Input } from 'moriui'

  const query = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="button-search">
      搜索
    </FieldLabel><ButtonGroup>
      <Input id="button-search" v-model="query" placeholder="输入关键词…" /><Button variant="outline">
        搜索
      </Button>
    </ButtonGroup>
  </Field>
</template>
