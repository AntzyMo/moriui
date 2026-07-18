<script setup lang="ts">
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    Input
  } from 'moriui'
</script>

<template>
  <FieldSet class="w-full max-w-xs">
    <FieldGroup>
      <Field>
        <FieldLabel for="username">
          用户名
        </FieldLabel><Input id="username" placeholder="Mori" /><FieldDescription>请选择唯一的用户名。</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="password">
          密码
        </FieldLabel><FieldDescription>至少包含 8 个字符。</FieldDescription><Input id="password" type="password" placeholder="••••••••" />
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
