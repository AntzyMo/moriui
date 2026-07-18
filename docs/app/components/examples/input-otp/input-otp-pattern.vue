<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from 'moriui'

  const code = ref<number[]>([])
</script>

<template>
  <InputOTP id="digits-only" v-model="code" type="number">
    <InputOTPGroup><InputOTPSlot v-for="index in 6" :key="index" :index="index - 1" /></InputOTPGroup>
  </InputOTP>
</template>
