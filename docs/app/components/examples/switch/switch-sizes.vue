<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldGroup, FieldLabel, Switch } from 'moriui'

  const small = shallowRef(false)
  const normal = shallowRef(true)
</script>

<template>
  <FieldGroup class="w-full max-w-40">
    <Field orientation="horizontal">
      <Switch id="switch-size-sm" v-model="small" size="sm" />
      <FieldLabel for="switch-size-sm">
        小号
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <Switch id="switch-size-default" v-model="normal" />
      <FieldLabel for="switch-size-default">
        默认
      </FieldLabel>
    </Field>
  </FieldGroup>
</template>
