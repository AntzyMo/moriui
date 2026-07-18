<script setup lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from 'moriui'
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <InputGroup>
      <InputGroupAddon><InputGroupText>¥</InputGroupText></InputGroupAddon><InputGroupInput aria-label="金额" placeholder="0.00" /><InputGroupAddon align="inline-end">
        <InputGroupText>CNY</InputGroupText>
      </InputGroupAddon>
    </InputGroup><InputGroup><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput aria-label="域名" placeholder="example.com" /></InputGroup>
  </div>
</template>
