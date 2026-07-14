<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'moriui'

  const code = shallowRef<number[]>([])
</script>

<template>
  <section class="playground__section">
    <h2>InputOTP</h2>
    <div class="playground__input-otp-examples">
      <InputOTP v-model="code" type="number" aria-label="六位验证码">
        <InputOTPGroup>
          <InputOTPSlot v-for="index in 3" :key="index" :index="index - 1" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot v-for="index in 3" :key="index" :index="index + 2" />
        </InputOTPGroup>
      </InputOTP>

      <InputOTP type="number" aria-invalid="true" aria-label="无效验证码">
        <InputOTPGroup>
          <InputOTPSlot v-for="index in 4" :key="index" :index="index - 1" />
        </InputOTPGroup>
      </InputOTP>

      <InputOTP disabled type="number" aria-label="不可用验证码">
        <InputOTPGroup>
          <InputOTPSlot v-for="index in 4" :key="index" :index="index - 1" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  </section>
</template>
