<script setup lang="ts">
  import { reactive } from 'vue'
  import { Field, FieldGroup, FieldLabel, Input } from 'moriui'

  const name = reactive({ first: '', last: '' })
</script>

<template>
  <FieldGroup class="grid w-full max-w-sm grid-cols-2">
    <Field>
      <FieldLabel for="first-name">
        名
      </FieldLabel><Input id="first-name" v-model="name.first" placeholder="晓" />
    </Field><Field>
      <FieldLabel for="last-name">
        姓
      </FieldLabel><Input id="last-name" v-model="name.last" placeholder="林" />
    </Field>
  </FieldGroup>
</template>
