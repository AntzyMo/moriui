<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'moriui'

  const code = ref<string[]>([])
</script>

<template>
  <InputOTP v-model="code" aria-label="分组验证码">
    <InputOTPGroup><InputOTPSlot :index="0" /><InputOTPSlot :index="1" /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot :index="2" /><InputOTPSlot :index="3" /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot :index="4" /><InputOTPSlot :index="5" /></InputOTPGroup>
  </InputOTP>
</template>
