<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Field, FieldLabel } from 'moriui'

  const checked = shallowRef(true)
</script>

<template>
  <Field orientation="horizontal">
    <Checkbox id="catalog-checkbox" v-model="checked" /><FieldLabel for="catalog-checkbox">
      接收更新
    </FieldLabel>
  </Field>
</template>
