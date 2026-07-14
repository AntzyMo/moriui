<script setup lang="ts">
  import { Plus } from '@lucide/vue'
  import { ref, shallowRef } from 'vue'
  import {
    Accordion,
    AccordionContent,
    AccordionIcon,
    AccordionItem,
    AccordionTrigger
  } from 'moriui'

  const accordionValue = shallowRef<string | undefined>('overview')
  const multipleAccordionValue = ref<string[]>(['tokens'])
</script>

<template>
  <section class="playground__section">
    <h2>Accordion</h2>
    <div class="playground__accordion-examples">
      <div class="playground__accordion-example">
        <p class="playground__example-label">
          单选（可收起）
        </p>
        <Accordion v-model="accordionValue" collapsible>
          <AccordionItem value="overview">
            <AccordionTrigger>
              组件概览
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>
              MoriUI 复用 Reka UI 的无障碍行为，并以 Nova 的紧凑视觉呈现。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="custom-icon">
            <AccordionTrigger>
              自定义图标
              <AccordionIcon>
                <Plus aria-hidden="true" />
              </AccordionIcon>
            </AccordionTrigger>
            <AccordionContent>
              通过 AccordionIcon 组合自定义图标。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem disabled value="disabled">
            <AccordionTrigger>
              不可用项目
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>此内容不可展开。</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div class="playground__accordion-example">
        <p class="playground__example-label">
          多选
        </p>
        <Accordion v-model="multipleAccordionValue" type="multiple">
          <AccordionItem value="tokens">
            <AccordionTrigger>
              设计 Token
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>组件通过语义 Token 自动适配浅色与深色主题。</AccordionContent>
          </AccordionItem>
          <AccordionItem value="keyboard">
            <AccordionTrigger>
              键盘操作
              <AccordionIcon />
            </AccordionTrigger>
            <AccordionContent>使用方向键、Home 与 End 在触发器之间移动焦点。</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>
