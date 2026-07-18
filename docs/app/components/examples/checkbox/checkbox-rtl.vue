<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from 'moriui'

  const checked = shallowRef(true)
</script>

<template>
  <Field dir="rtl" orientation="horizontal">
    <Checkbox id="terms-rtl" v-model="checked" dir="rtl" />
    <FieldContent>
      <FieldLabel for="terms-rtl">
        قبول الشروط والأحكام
      </FieldLabel><FieldDescription>يمكنك تغيير هذا الخيار في أي وقت.</FieldDescription>
    </FieldContent>
  </Field>
</template>
