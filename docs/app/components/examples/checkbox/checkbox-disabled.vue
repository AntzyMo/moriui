<script setup lang="ts">
  import { Checkbox, Field, FieldLabel } from 'moriui'
</script>

<template>
  <Field data-disabled orientation="horizontal">
    <Checkbox id="notifications-disabled" disabled />
    <FieldLabel for="notifications-disabled">
      启用通知
    </FieldLabel>
  </Field>
</template>
