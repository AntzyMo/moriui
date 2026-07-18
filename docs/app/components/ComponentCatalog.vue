<script setup lang="ts">
  import { Button, Card } from 'moriui'
  import { componentGroups } from '~/documentation/registry'
</script>

<template>
  <article class="grid gap-12 pb-12">
    <header class="grid max-w-2xl gap-3">
      <p class="text-sm font-medium text-muted-foreground">
        组件
      </p>
      <h1 class="text-4xl font-semibold tracking-tight">
        全部组件
      </h1>
      <p class="leading-7 text-muted-foreground">
        按使用场景浏览 MoriUI。已发布条目包含可运行示例与 API，其余条目会清楚标记当前状态。
      </p>
    </header>

    <section
      v-for="group in componentGroups"
      :id="group.title"
      :key="group.title"
      class="grid scroll-mt-32 gap-5"
    >
      <h2 class="text-2xl font-semibold tracking-tight">
        {{ group.title }}
      </h2>
      <div class="grid grid-cols-[repeat(auto-fill,13.125rem)] justify-start gap-4">
        <Card v-for="item in group.items" :key="item.slug" class="grid w-[210px] content-between gap-4 p-4">
          <div class="grid h-[120px] place-items-center overflow-hidden">
            <component :is="item.catalogPreview" />
          </div>
          <div class="grid gap-1">
            <p class="font-medium">
              {{ item.name }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ item.title }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ item.summary }}
            </p>
          </div>
          <Button
            as-child
            class="w-full"
            size="sm"
            :variant="item.status === 'published' ? 'default' : 'secondary'"
          >
            <NuxtLink :to="`/docs/components/${item.slug}`">
              {{ item.status === 'published' ? '查看文档' : '查看状态' }}
            </NuxtLink>
          </Button>
        </Card>
      </div>
    </section>
  </article>
</template>
