<script setup lang="ts">
  import { computed } from 'vue'
  import { Button } from 'moriui'

  import { useSiteTheme } from './use-site-theme'

  const { mode } = defineProps<{
    mode: 'home' | 'docs'
  }>()

  const { theme, toggleTheme } = useSiteTheme()
  const themeLabel = computed(() => theme.value === 'dark' ? '切换到浅色主题' : '切换到深色主题')
</script>

<template>
  <header class="sticky top-0 z-50 bg-background text-foreground">
    <nav aria-label="主导航">
      <div class="mx-auto flex min-h-16 max-w-[1360px] items-center gap-1 px-4 sm:px-6">
        <Button as-child class="mr-3 px-1 text-base font-semibold tracking-tight" variant="ghost">
          <NuxtLink to="/">
            MoriUI
          </NuxtLink>
        </Button>

        <div class="hidden items-center gap-1 md:flex">
          <Button as-child size="sm" variant="ghost">
            <NuxtLink to="/docs/getting-started">
              文档
            </NuxtLink>
          </Button>
          <Button as-child size="sm" variant="ghost">
            <NuxtLink to="/docs/components">
              组件
            </NuxtLink>
          </Button>
          <Button as-child size="sm" variant="ghost">
            <NuxtLink to="/docs/themes">
              主题
            </NuxtLink>
          </Button>
          <Button as-child size="sm" variant="ghost">
            <NuxtLink to="/docs/components/button#使用">
              示例
            </NuxtLink>
          </Button>
        </div>

        <div class="ml-auto flex items-center gap-1">
          <Button
            aria-label="搜索文档"
            size="sm"
            type="button"
            variant="ghost"
          >
            搜索
          </Button>
          <Button
            :aria-label="themeLabel"
            size="sm"
            type="button"
            variant="ghost"
            @click="toggleTheme"
          >
            {{ theme === 'dark' ? '浅色' : '深色' }}
          </Button>
          <Button
            as-child
            class="hidden sm:inline-flex"
            size="sm"
            variant="ghost"
          >
            <a href="https://github.com/AntzyMo/moriui" rel="noreferrer" target="_blank">GitHub</a>
          </Button>
        </div>
      </div>
    </nav>
  </header>
</template>
