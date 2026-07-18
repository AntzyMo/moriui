<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
    Switch
  } from 'moriui'

  const share = shallowRef(false)
  const notifications = shallowRef(true)
</script>

<template>
  <FieldGroup class="w-full max-w-sm">
    <FieldLabel for="switch-share">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>跨设备共享</FieldTitle>
          <FieldDescription>专注状态会同步到已登录的设备。</FieldDescription>
        </FieldContent>
        <Switch id="switch-share" v-model="share" />
      </Field>
    </FieldLabel>
    <FieldLabel for="switch-notifications">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>启用通知</FieldTitle>
          <FieldDescription>专注模式变化时接收通知。</FieldDescription>
        </FieldContent>
        <Switch id="switch-notifications" v-model="notifications" />
      </Field>
    </FieldLabel>
  </FieldGroup>
</template>
