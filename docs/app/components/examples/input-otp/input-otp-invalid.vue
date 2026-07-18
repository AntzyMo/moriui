<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from 'moriui'

  const code = ref<number[]>([0, 0, 0, 0, 0, 0])
</script>

<template>
  <InputOTP v-model="code" type="number" aria-label="无效验证码">
    <InputOTPGroup>
      <InputOTPSlot
        v-for="index in 6"
        :key="index"
        :index="index - 1"
        aria-invalid="true"
      />
    </InputOTPGroup>
  </InputOTP>
</template>
