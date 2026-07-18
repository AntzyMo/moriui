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

  const form = reactive({ name: '', email: '', phone: '', address: '' })
</script>

<template>
  <form class="w-full max-w-sm">
    <FieldGroup>
      <Field>
        <FieldLabel for="form-name">
          姓名
        </FieldLabel><Input id="form-name" v-model="form.name" required />
      </Field><Field>
        <FieldLabel for="form-email">
          邮箱
        </FieldLabel><Input id="form-email" v-model="form.email" type="email" /><FieldDescription>我们不会分享你的邮箱。</FieldDescription>
      </Field><Field>
        <FieldLabel for="form-phone">
          电话
        </FieldLabel><Input id="form-phone" v-model="form.phone" type="tel" />
      </Field><Field>
        <FieldLabel for="form-address">
          地址
        </FieldLabel><Input id="form-address" v-model="form.address" />
      </Field><Field orientation="horizontal">
        <Button type="button" variant="outline">
          取消
        </Button><Button type="submit">
          提交
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
