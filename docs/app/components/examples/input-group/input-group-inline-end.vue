<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { EyeOff } from '@lucide/vue'
  import {
    Field,
    FieldDescription,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from 'moriui'

  const password = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-sm">
    <FieldLabel for="inline-end">
      密码
    </FieldLabel><InputGroup>
      <InputGroupInput id="inline-end" v-model="password" type="password" /><InputGroupAddon align="inline-end">
        <EyeOff />
      </InputGroupAddon>
    </InputGroup><FieldDescription>图标位于输入框结束侧。</FieldDescription>
  </Field>
</template>
