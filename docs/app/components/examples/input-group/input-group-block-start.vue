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

  const name = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel for="block-start">
      姓名
    </FieldLabel><InputGroup>
      <InputGroupInput id="block-start" v-model="name" placeholder="输入姓名" /><InputGroupAddon align="block-start">
        <InputGroupText>完整姓名</InputGroupText>
      </InputGroupAddon>
    </InputGroup><FieldDescription>附加内容位于输入框上方。</FieldDescription>
  </Field>
</template>
