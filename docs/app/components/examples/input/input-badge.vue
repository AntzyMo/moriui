<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Badge, Field, FieldLabel, Input } from 'moriui'

  const url = shallowRef('')
</script>

<template>
  <Field class="w-full max-w-xs">
    <FieldLabel for="webhook">
      Webhook 地址 <Badge variant="secondary">
        推荐
      </Badge>
    </FieldLabel><Input
      id="webhook"
      v-model="url"
      type="url"
      placeholder="https://api.example.com/webhook"
    />
  </Field>
</template>
