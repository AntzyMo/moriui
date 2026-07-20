<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'

const items = [
  {
    value: 'item-1',
    trigger: '如何重置密码？',
    content: '在登录页面点击"忘记密码"，输入您的邮箱地址，我们将发送重置密码链接。链接将在24小时内有效。'
  },
  {
    value: 'item-2',
    trigger: '可以更改订阅方案吗？',
    content: '是的，您可以在账户设置中随时升级或降级方案，更改将在下一个计费周期生效。'
  },
  {
    value: 'item-3',
    trigger: '支持哪些支付方式？',
    content: '我们支持所有主流信用卡、PayPal 和银行转账，所有支付均通过安全合作伙伴加密处理。'
  }
]
</script>
<template>
  <Accordion default-value="item-1" class="max-w-lg">
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
      <AccordionContent>{{ item.content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
