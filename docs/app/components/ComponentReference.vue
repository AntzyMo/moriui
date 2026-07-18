<script setup lang="ts">
  import type { ComponentRecord, PublishedComponentRecord } from '~/documentation/registry'

  import { computed } from 'vue'
  import { Badge, Button } from 'moriui'

  import CodeBlock from './CodeBlock.vue'
  import ExamplePanel from './ExamplePanel.vue'
  import { getComponent } from '~/documentation/registry'

  const props = defineProps<{
    component: PublishedComponentRecord
  }>()

  const relatedComponents = computed(() => props.component.related
    .map(slug => getComponent(slug))
    .filter((record): record is ComponentRecord => Boolean(record)))
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

    <section id="资源" class="grid scroll-mt-32 gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">
        资源
      </h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="resource in component.reference.resources"
          :key="resource.href"
          as-child
          size="sm"
          variant="secondary"
        >
          <a :href="resource.href" rel="noreferrer" target="_blank">{{ resource.label }}</a>
        </Button>
      </div>
    </section>

    <section id="导入" class="grid scroll-mt-32 gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">
        导入
      </h2>
      <CodeBlock :code="component.reference.importCode" />
    </section>

    <section
      v-for="state in component.reference.states"
      :id="state.id"
      :key="state.id"
      class="grid scroll-mt-32 gap-3"
    >
      <h2 class="text-2xl font-semibold tracking-tight">
        {{ state.title }}
      </h2>
      <p class="leading-7 text-muted-foreground">
        {{ state.description }}
      </p>
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

    <section id="无障碍说明" class="grid scroll-mt-32 gap-3">
      <h2 class="text-2xl font-semibold tracking-tight">
        无障碍说明
      </h2>
      <p class="leading-7 text-muted-foreground">
        {{ component.reference.accessibility.description }}
      </p>
    </section>

    <section id="关联组件" class="grid scroll-mt-32 gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">
        关联组件
      </h2>
      <div v-if="relatedComponents.length" class="flex flex-wrap gap-2">
        <Button
          v-for="record in relatedComponents"
          :key="record.slug"
          as-child
          size="sm"
          variant="secondary"
        >
          <NuxtLink :to="`/docs/components/${record.slug}`">
            {{ record.title }}
          </NuxtLink>
        </Button>
      </div>
      <p v-else class="text-sm text-muted-foreground">
        这个组件暂时没有登记关联条目。
      </p>
    </section>
  </article>
</template>
