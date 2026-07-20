<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'

const items = [
  {
    value: 'billing',
    trigger: '账单如何运作？',
    content: '我们提供月付和年付订阅方案。账单在每个周期开始时自动扣费，您可以随时取消。所有方案均包含自动备份、全天候客服支持和无限制团队成员。'
  },
  {
    value: 'security',
    trigger: '我的数据安全吗？',
    content: '是的。我们采用端到端加密、SOC 2 Type II 合规认证和定期第三方安全审计。所有数据在传输和存储过程中均使用行业标准协议加密。'
  },
  {
    value: 'integration',
    trigger: '支持哪些集成？',
    content: '我们与 500 多种主流工具集成，包括 Slack、Zapier、Salesforce、HubSpot 等。您还可以通过 REST API 和 Webhook 构建自定义集成。'
  }
]
</script>
<template>
  <Accordion default-value="billing" class="max-w-lg rounded-lg border">
    <AccordionItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      class="border-b px-4 last:border-b-0"
    >
      <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
      <AccordionContent>{{ item.content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
