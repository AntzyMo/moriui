<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'
</script>
<template>
  <Accordion class="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>我可以查看账户历史吗？</AccordionTrigger>
      <AccordionContent>
        是的，您可以在控制台的"账户历史"中查看完整的账户活动记录，包括所有交易、方案变更和支持工单。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2" disabled>
      <AccordionTrigger>高级功能信息</AccordionTrigger>
      <AccordionContent>
        此部分包含高级功能信息。升级您的方案以访问此内容。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>如何更新我的邮箱地址？</AccordionTrigger>
      <AccordionContent>
        您可以在账户设置中更新邮箱地址。修改后，您将收到一封验证邮件以确认变更。
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
