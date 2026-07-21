<script setup lang="ts">
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'

  const items = [
    {
      value: 'notifications',
      trigger: '通知设置',
      content: '管理您接收通知的方式，您可以启用电子邮件提醒或移动设备推送通知。'
    },
    {
      value: 'privacy',
      trigger: '隐私与安全',
      content: '控制您的隐私设置和安全偏好，可启用双重认证、管理已连接的设备、查看活跃会话以及配置数据共享偏好。您还可以下载数据或删除账户。'
    },
    {
      value: 'billing',
      trigger: '账单与订阅',
      content: '查看当前方案、付款历史和即将到来的账单。更新支付方式、更改订阅等级或取消订阅。'
    }
  ]
</script>

<template>
  <Accordion type="multiple" class="max-w-lg" :default-value="['notifications']">
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
      <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
      <AccordionContent>{{ item.content }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
