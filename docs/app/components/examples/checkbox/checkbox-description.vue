<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <Field orientation="horizontal">
    <Checkbox id="terms-description" v-model="checked" />
    <FieldContent>
      <FieldLabel for="terms-description">
        接受条款与条件
      </FieldLabel>
      <FieldDescription>勾选即表示你同意服务条款和隐私政策。</FieldDescription>
    </FieldContent>
  </Field>
</template>
