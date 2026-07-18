<script setup lang="ts">
  import { ref } from 'vue'
  import { RefreshCw } from '@lucide/vue'
  import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
  } from 'moriui'

  const code = ref<number[]>([])
</script>

<template>
  <Card class="w-full max-w-md">
    <CardHeader><CardTitle>验证登录</CardTitle><CardDescription>输入发送到 team@moriui.dev 的验证码。</CardDescription></CardHeader><CardContent>
      <Field>
        <div class="flex items-center justify-between">
          <FieldLabel for="verification-code">
            验证码
          </FieldLabel><Button size="xs" variant="outline">
            <RefreshCw />重新发送
          </Button>
        </div><InputOTP
          id="verification-code"
          v-model="code"
          required
          type="number"
        >
          <InputOTPGroup><InputOTPSlot v-for="index in 3" :key="index" :index="index - 1" /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot v-for="index in 3" :key="index + 3" :index="index + 2" /></InputOTPGroup>
        </InputOTP><FieldDescription>无法访问邮箱？请联系支持团队。</FieldDescription>
      </Field>
    </CardContent><CardFooter>
      <Button class="w-full" type="submit">
        验证
      </Button>
    </CardFooter>
  </Card>
</template>
