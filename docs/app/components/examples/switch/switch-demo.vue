<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldLabel, Switch } from 'moriui'

  const airplaneMode = shallowRef(false)
</script>

<template>
  <Field class="w-fit" orientation="horizontal">
    <Switch id="airplane-mode" v-model="airplaneMode" />
    <FieldLabel for="airplane-mode">
      飞行模式
    </FieldLabel>
  </Field>
</template>
