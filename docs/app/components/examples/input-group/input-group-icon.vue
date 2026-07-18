<script setup lang="ts">
  import { Check, CreditCard, Mail, Search } from '@lucide/vue'
  import { InputGroup, InputGroupAddon, InputGroupInput } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup><InputGroupInput aria-label="搜索" placeholder="搜索…" /><InputGroupAddon><Search /></InputGroupAddon></InputGroup><InputGroup><InputGroupInput aria-label="邮箱" type="email" placeholder="输入邮箱" /><InputGroupAddon><Mail /></InputGroupAddon></InputGroup><InputGroup>
      <InputGroupInput aria-label="卡号" placeholder="卡号" /><InputGroupAddon><CreditCard /></InputGroupAddon><InputGroupAddon align="inline-end">
        <Check />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
