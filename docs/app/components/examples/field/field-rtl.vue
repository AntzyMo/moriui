<script setup lang="ts">
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input
  } from 'moriui'
</script>

<template>
  <FieldSet dir="rtl" class="w-full max-w-sm">
    <FieldLegend>معلومات الدفع</FieldLegend><FieldDescription>جميع المعاملات آمنة ومشفرة.</FieldDescription><FieldGroup>
      <Field>
        <FieldLabel for="rtl-name">
          الاسم على البطاقة
        </FieldLabel><Input id="rtl-name" dir="rtl" required />
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
