<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Search } from '@lucide/vue'
  import {
    Field,
    FieldDescription,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from 'moriui'

  const query = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel for="inline-start">
      搜索
    </FieldLabel><InputGroup>
      <InputGroupInput id="inline-start" v-model="query" /><InputGroupAddon align="inline-start">
        <Search />
      </InputGroupAddon>
    </InputGroup><FieldDescription>图标位于输入框起始侧。</FieldDescription>
  </Field>
</template>
