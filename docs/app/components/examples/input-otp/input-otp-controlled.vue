<script setup lang="ts">
  import { ref } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSlot } from 'moriui'

  const code = ref<number[]>([])
</script>

<template>
  <div class="space-y-2">
    <InputOTP v-model="code" type="number" aria-label="受控验证码">
      <InputOTPGroup><InputOTPSlot v-for="index in 6" :key="index" :index="index - 1" /></InputOTPGroup>
    </InputOTP><p class="text-center text-sm">
      {{ code.length ? `已输入：${code.join('')}` : '请输入一次性验证码。' }}
    </p>
  </div>
</template>
