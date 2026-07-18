<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Field, FieldContent, FieldDescription, FieldLabel, Switch } from 'moriui'

  const shared = shallowRef(false)
</script>

<template>
  <Field class="max-w-sm" orientation="horizontal">
    <FieldContent>
      <FieldLabel for="switch-focus-mode">
        跨设备共享
      </FieldLabel>
      <FieldDescription>专注状态会同步到已登录的设备。</FieldDescription>
    </FieldContent>
    <Switch id="switch-focus-mode" v-model="shared" />
  </Field>
</template>
