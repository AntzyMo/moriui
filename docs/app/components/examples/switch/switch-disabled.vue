<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, Switch } from 'moriui'

  const enabled = shallowRef(false)
</script>

<template>
  <Field class="w-fit" orientation="horizontal" data-disabled>
    <Switch id="switch-disabled" v-model="enabled" disabled />
    <FieldLabel for="switch-disabled">
      不可更改
    </FieldLabel>
  </Field>
</template>
