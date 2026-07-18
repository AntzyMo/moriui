<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel
  } from 'moriui'

  const checked = shallowRef(false)
</script>

<template>
  <FieldGroup class="w-full max-w-sm">
    <Field orientation="horizontal">
      <Checkbox id="terms" v-model="checked" /><FieldLabel for="terms">
        接受条款与条件
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <Checkbox id="updates" v-model="checked" />
      <FieldContent>
        <FieldLabel for="updates">
          接收产品更新
        </FieldLabel><FieldDescription>可以随时在设置中更改。</FieldDescription>
      </FieldContent>
    </Field>
  </FieldGroup>
</template>
