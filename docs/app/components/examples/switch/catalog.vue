<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, Switch } from 'moriui'

  const enabled = shallowRef(true)
</script>

<template>
  <Field class="w-fit" orientation="horizontal">
    <Switch id="catalog-switch" v-model="enabled" size="sm" />
    <FieldLabel for="catalog-switch">
      同步
    </FieldLabel>
  </Field>
</template>
