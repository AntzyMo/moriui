<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldContent, FieldDescription, FieldLabel, Switch } from 'moriui'

  const accepted = shallowRef(false)
</script>

<template>
  <Field class="max-w-sm" orientation="horizontal" data-invalid>
    <FieldContent>
      <FieldLabel for="switch-terms">
        接受条款与条件
      </FieldLabel>
      <FieldDescription>继续之前必须接受条款与条件。</FieldDescription>
    </FieldContent>
    <Switch id="switch-terms" v-model="accepted" aria-invalid="true" />
  </Field>
</template>
