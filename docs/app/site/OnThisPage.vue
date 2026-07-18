<script setup lang="ts">
  import type { TocItem } from '~/documentation/toc'

  import { Button } from 'moriui'

  defineProps<{
    items: readonly TocItem[]
  }>()

  const route = useRoute()
</script>

<template>
  <aside
    v-if="items.length"
    aria-label="本页目录"
    class="sticky top-28 hidden h-fit gap-1 text-sm text-muted-foreground xl:grid"
  >
    <p class="mb-2 px-2 font-medium text-foreground">
      本页目录
    </p>
    <Button
      v-for="item in items"
      :key="item.id"
      as-child
      class="h-auto justify-start px-2 py-1.5 font-normal"
      size="sm"
      variant="ghost"
    >
      <NuxtLink
        :aria-current="route.hash === `#${item.id}` ? 'location' : undefined"
        :class="route.hash === `#${item.id}` ? 'bg-accent text-accent-foreground' : undefined"
        :to="{ path: route.path, hash: `#${item.id}` }"
      >
        {{ item.label }}
      </NuxtLink>
    </Button>
  </aside>
</template>
