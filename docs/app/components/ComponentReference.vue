<script setup lang="ts">
  import type { PublishedComponentRecord } from '~/documentation/registry'

  import { Badge } from 'moriui'
  import CodeBlock from './CodeBlock.vue'
  import ExamplePanel from './ExamplePanel.vue'

  const props = defineProps<{
    component: PublishedComponentRecord
  }>()
</script>

<template>
  <article class="grid gap-12 pb-12">
    <header class="grid max-w-2xl gap-3">
      <div>
        <Badge variant="secondary">
          {{ component.group }}
        </Badge>
      </div>
      <h1 class="text-4xl font-semibold tracking-tight">
        {{ component.name }} <span class="text-muted-foreground">{{ component.title }}</span>
      </h1>
      <p class="text-lg leading-8 text-muted-foreground">
        {{ component.summary }}
      </p>
    </header>

    <section id="导入" class="grid scroll-mt-32 gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">
        导入
      </h2>
      <CodeBlock :code="component.reference.importCode" />
    </section>
    <section id="示例" class="grid scroll-mt-32 gap-8">
      <h2 class="text-2xl font-semibold tracking-tight">
        示例
      </h2>
      <ExamplePanel
        v-for="example in component.reference.examples"
        :key="example.id"
        :code="example.code"
        :description="example.description"
        :title="example.title"
      >
        <template #preview>
          <component :is="example.preview" />
        </template>
      </ExamplePanel>
    </section>

    <section id="API-参考" class="grid scroll-mt-32 gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">
        API
      </h2>
      <div class="overflow-x-auto rounded-lg bg-muted/35">
        <table class="w-full min-w-[42rem] text-left text-sm">
          <thead class="text-muted-foreground">
            <tr>
              <th class="p-3">
                属性
              </th><th class="p-3">
                类型
              </th><th class="p-3">
                默认值
              </th><th class="p-3">
                说明
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in component.reference.api" :key="row.name" class="border-t border-border">
              <td class="p-3 font-medium">
                {{ row.name }}
              </td><td class="p-3">
                <code>{{ row.type }}</code>
              </td><td class="p-3">
                <code>{{ row.defaultValue }}</code>
              </td><td class="p-3 text-muted-foreground">
                {{ row.description }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>
