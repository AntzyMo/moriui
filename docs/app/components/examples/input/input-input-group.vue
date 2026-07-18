<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Info } from '@lucide/vue'
  import {
    Field,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText
  } from 'moriui'

  const url = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="website">
      网站地址
    </FieldLabel><InputGroup>
      <InputGroupInput id="website" v-model="url" placeholder="example.com" /><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupAddon align="inline-end">
        <Info />
      </InputGroupAddon>
    </InputGroup>
  </Field>
</template>
