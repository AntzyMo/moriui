<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldDescription,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText
  } from 'moriui'

  const amount = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel for="block-end">
      金额
    </FieldLabel><InputGroup>
      <InputGroupInput id="block-end" v-model="amount" inputmode="decimal" /><InputGroupAddon align="block-end">
        <InputGroupText>人民币 CNY</InputGroupText>
      </InputGroupAddon>
    </InputGroup><FieldDescription>附加内容位于输入框下方。</FieldDescription>
  </Field>
</template>
