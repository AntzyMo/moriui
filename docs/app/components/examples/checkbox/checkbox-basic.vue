<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Field, FieldLabel } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <Field orientation="horizontal">
    <Checkbox id="terms-basic" v-model="checked" />
    <FieldLabel for="terms-basic">
      接受条款与条件
    </FieldLabel>
  </Field>
</template>
