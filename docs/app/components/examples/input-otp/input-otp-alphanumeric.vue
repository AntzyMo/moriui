<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'moriui'

  const code = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="code" type="text" aria-label="字母数字验证码">
    <InputOTPGroup><InputOTPSlot v-for="index in 3" :key="index" :index="index - 1" /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot v-for="index in 3" :key="index + 3" :index="index + 2" /></InputOTPGroup>
  </InputOTP>
</template>
