<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Field, FieldLabel } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <Field data-invalid orientation="horizontal">
    <Checkbox id="terms-invalid" v-model="checked" aria-invalid="true" />
    <FieldLabel for="terms-invalid">
      接受条款与条件
    </FieldLabel>
  </Field>
</template>
