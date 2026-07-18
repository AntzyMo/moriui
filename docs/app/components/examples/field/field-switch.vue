<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, Switch } from 'moriui'

  const enabled = shallowRef(false)
</script>

<template>
  <Field class="w-fit" orientation="horizontal">
    <FieldLabel for="two-factor">
      多因素认证
    </FieldLabel><Switch id="two-factor" v-model="enabled" />
  </Field>
</template>
