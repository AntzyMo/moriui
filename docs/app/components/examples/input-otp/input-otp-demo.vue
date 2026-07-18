<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from 'moriui'

  const code = ref<number[]>([1, 2, 3, 4, 5, 6])
</script>

<template>
  <InputOTP v-model="code" type="number" aria-label="六位验证码">
    <InputOTPGroup><InputOTPSlot v-for="index in 6" :key="index" :index="index - 1" /></InputOTPGroup>
  </InputOTP>
</template>
