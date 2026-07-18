<script setup lang="ts">
  import { LoaderCircle } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Spinner } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupInput aria-label="搜索状态" placeholder="搜索中…" /><InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup><InputGroup>
      <InputGroupInput aria-label="保存状态" placeholder="保存更改…" /><InputGroupAddon align="inline-end">
        <InputGroupText>保存中</InputGroupText><LoaderCircle class="animate-spin" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
