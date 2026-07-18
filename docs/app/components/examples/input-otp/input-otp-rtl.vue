<script setup lang="ts">
  import { ref } from 'vue'
  import { Field, FieldLabel, InputOTP, InputOTPGroup, InputOTPSlot } from 'moriui'

  const code = ref<number[]>([1, 2, 3, 4, 5, 6])
</script>

<template>
  <Field dir="rtl" class="w-full max-w-xs">
    <FieldLabel for="otp-rtl">
      رمز التحقق
    </FieldLabel><InputOTP
      id="otp-rtl"
      v-model="code"
      dir="rtl"
      type="number"
    >
      <InputOTPGroup><InputOTPSlot v-for="index in 6" :key="index" :index="index - 1" /></InputOTPGroup>
    </InputOTP>
  </Field>
</template>
