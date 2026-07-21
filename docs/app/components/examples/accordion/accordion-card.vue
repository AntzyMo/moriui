<script setup lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from 'moriui'

  const items = [
    {
      value: 'plans',
      trigger: '提供哪些订阅套餐？',
      content: '我们提供三个订阅档位：入门版（9美元/月）、专业版（29美元/月）和企业版（99美元/月）。每个方案包含递增的存储空间、API 访问权限、优先客服和团队协作功能。'
    },
    {
      value: 'billing',
      trigger: '账单如何运作？',
      content: '每个计费周期开始时自动扣费。我们接受所有主流信用卡、PayPal 以及企业客户的 ACH 转账。每次付款后您将通过电子邮件收到发票。'
    },
    {
      value: 'cancel',
      trigger: '如何取消订阅？',
      content: '您可以随时从账户设置中取消订阅，无需支付取消费用。取消后，您的访问权限将持续到当前计费周期结束。'
    }
  ]
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>订阅与账单</CardTitle>
      <CardDescription>关于账户、方案、付款和取消的常见问题。</CardDescription>
    </CardHeader>
    <CardContent>
      <Accordion default-value="plans">
        <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
          <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
          <AccordionContent>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
</template>
