<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'
</script>
<template>
  <Accordion default-value="shipping" class="max-w-lg">
    <AccordionItem value="shipping">
      <AccordionTrigger>配送方式有哪些？</AccordionTrigger>
      <AccordionContent>
        我们提供标准配送（5-7天）、快递配送（2-3天）和次日达服务，国际订单满额包邮。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="returns">
      <AccordionTrigger>退换货政策是什么？</AccordionTrigger>
      <AccordionContent>
        收货后30天内可退换，商品需保持未使用且原包装完好，退款将在5-7个工作日内处理。
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="support">
      <AccordionTrigger>如何联系客服？</AccordionTrigger>
      <AccordionContent>
        您可以通过电子邮件、在线聊天或电话联系我们，工作日内我们将在24小时内回复。
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
