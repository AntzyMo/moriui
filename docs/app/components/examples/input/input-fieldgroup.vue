<script setup lang="ts">
  import { reactive } from 'vue'
  import {
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input
  } from 'moriui'

  const form = reactive({ name: '', email: '' })
</script>

<template>
  <FieldGroup class="w-full max-w-xs">
    <Field>
      <FieldLabel for="name">
        姓名
      </FieldLabel><Input id="name" v-model="form.name" placeholder="林晓" />
    </Field><Field>
      <FieldLabel for="email">
        邮箱
      </FieldLabel><Input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="name@example.com"
      /><FieldDescription>更新将发送到此地址。</FieldDescription>
    </Field><Field orientation="horizontal">
      <Button type="reset" variant="outline">
        重置
      </Button><Button type="submit">
        提交
      </Button>
    </Field>
  </FieldGroup>
</template>
