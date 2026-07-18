<script setup lang="ts">
  import { computed } from 'vue'
  import { Button } from 'moriui'

  import { guidePages } from '~/documentation/toc'
  import { componentRegistry } from '~/documentation/registry'

  const route = useRoute()
  const components = computed(() => [...componentRegistry]
    .sort((left, right) => left.name.localeCompare(right.name, 'en')))
</script>

<template>
  <nav aria-label="文档导航" class="grid gap-7 pb-8">
    <section class="grid gap-1">
      <h2 class="mb-1 px-2 text-xs font-semibold text-muted-foreground">
        指南
      </h2>
      <Button
        v-for="guide in guidePages"
        :key="guide.path"
        as-child
        class="h-auto w-full justify-start px-2 py-1.5 font-normal"
        size="sm"
        variant="ghost"
      >
        <NuxtLink :aria-current="route.path === guide.path ? 'page' : undefined" :to="guide.path">
          {{ guide.title }}
        </NuxtLink>
      </Button>
    </section>

    <section class="grid gap-1">
      <h2 class="mb-1 px-2 text-xs font-semibold text-muted-foreground">
        组件
      </h2>
      <Button
        as-child
        class="h-auto w-full justify-start px-2 py-1.5 font-normal"
        size="sm"
        variant="ghost"
      >
        <NuxtLink :aria-current="route.path === '/docs/components' ? 'page' : undefined" to="/docs/components">
          所有组件
        </NuxtLink>
      </Button>
      <Button
        v-for="item in components"
        :key="item.slug"
        as-child
        class="h-auto w-full justify-start px-2 py-1.5 font-normal"
        size="sm"
        variant="ghost"
      >
        <NuxtLink
          :aria-current="route.path.endsWith(`/${item.slug}`) ? 'page' : undefined"
          :to="`/docs/components/${item.slug}`"
          class="flex w-full items-baseline gap-2"
        >
          <span>{{ item.name }}</span>
          <span class="text-xs text-muted-foreground">{{ item.title }}</span>
        </NuxtLink>
      </Button>
    </section>
  </nav>
</template>
