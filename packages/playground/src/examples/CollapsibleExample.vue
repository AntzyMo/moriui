<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
  } from 'moriui'

  const collapsibleOpen = shallowRef(false)
</script>

<template>
  <section class="playground__section">
    <h2>Collapsible</h2>
    <div class="playground__collapsible-examples">
      <div class="playground__collapsible-example">
        <p class="playground__example-label">
          受控开闭
        </p>
        <Collapsible v-model:open="collapsibleOpen">
          <CollapsibleTrigger class="w-full justify-between">
            发布摘要
            <span aria-hidden="true">{{ collapsibleOpen ? '−' : '+' }}</span>
          </CollapsibleTrigger>
          <CollapsibleContent class="pt-2 text-muted-foreground">
            组件会将开闭状态同步到父级，适合需要在其他区域复用状态的场景。
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div class="playground__collapsible-example">
        <p class="playground__example-label">
          默认展开与禁用状态
        </p>
        <Collapsible default-open>
          <CollapsibleTrigger class="w-full justify-between">
            初始说明
            <span aria-hidden="true">−</span>
          </CollapsibleTrigger>
          <CollapsibleContent class="pt-2 text-muted-foreground">
            未传入受控值时，可使用 default-open 指定初始状态。
          </CollapsibleContent>
        </Collapsible>
        <Collapsible disabled>
          <CollapsibleTrigger>
            不可用的内容区域
          </CollapsibleTrigger>
          <CollapsibleContent>此内容不可展开。</CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  </section>
</template>
