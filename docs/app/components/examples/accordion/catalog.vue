<script setup lang="ts">
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'moriui'
</script>

<template>
  <Accordion class="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>选项一</AccordionTrigger><AccordionContent>内容一</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
