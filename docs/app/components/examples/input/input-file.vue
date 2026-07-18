<script setup lang="ts">
  import { Field, FieldDescription, FieldLabel, Input } from 'moriui'
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="picture">
      图片
    </FieldLabel><Input id="picture" accept="image/*" type="file" /><FieldDescription>选择一张图片上传。</FieldDescription>
  </Field>
</template>
