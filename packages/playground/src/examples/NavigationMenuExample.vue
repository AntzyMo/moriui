<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
  } from 'moriui'

  const activeItem = shallowRef('')
</script>

<template>
  <section class="playground__section">
    <h2>Navigation Menu</h2>
    <NavigationMenu v-model="activeItem">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#overview">
            概览
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>产品</NavigationMenuTrigger>
          <NavigationMenuContent class="grid w-[min(24rem,calc(100vw-2rem))] gap-1 p-2">
            <NavigationMenuLink href="#components" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">组件库</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">
                  基于 Reka UI、Token 和 Nova 视觉语言构建的 Vue 组件。
                </span>
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="#themes" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">主题系统</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">
                  通过语义 Token 在亮色和深色模式间保持稳定的层级关系。
                </span>
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="#accessibility" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">无障碍支持</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">
                  由行为原语提供键盘导航、焦点管理和 ARIA 语义。
                </span>
              </span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>资源</NavigationMenuTrigger>
          <NavigationMenuContent class="grid w-[min(36rem,calc(100vw-2rem))] grid-cols-1 gap-1 p-2 sm:grid-cols-2">
            <NavigationMenuLink href="#guide" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">使用指南</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">从安装、主题到组合模式的完整说明。</span>
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="#api" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">API 参考</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">查询 Props、事件、插槽与可访问性契约。</span>
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="#examples" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">示例集合</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">从基础组合到复杂业务界面的可运行示例。</span>
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="#changelog" class="h-auto w-full items-start justify-start px-3 py-2.5">
              <span class="grid gap-1">
                <span class="text-sm leading-none font-medium">更新日志</span>
                <span class="line-clamp-2 text-left text-xs leading-snug text-muted-foreground">了解组件 API、视觉与行为契约的变更。</span>
              </span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="workflow">
          <NavigationMenuTrigger>工作流</NavigationMenuTrigger>
          <NavigationMenuContent class="grid w-[min(18rem,calc(100vw-2rem))] gap-1 p-2">
            <NavigationMenuLink href="#backlog" class="h-auto w-full justify-start gap-2 px-3 py-2">
              <svg
                aria-hidden="true"
                class="size-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8 7h8M8 12h8M8 17h5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="1.5"
                />
              </svg>
              待处理
            </NavigationMenuLink>
            <NavigationMenuLink href="#progress" class="h-auto w-full justify-start gap-2 px-3 py-2">
              <svg
                aria-hidden="true"
                class="size-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m7 12 3 3 7-7"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M5 5h14v14H5z"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              进行中
            </NavigationMenuLink>
            <NavigationMenuLink href="#done" class="h-auto w-full justify-start gap-2 px-3 py-2">
              <svg
                aria-hidden="true"
                class="size-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              已完成
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#documentation" class="justify-center" @pointerenter="activeItem = ''">
            文档
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
    <p class="playground__example-label mt-2">
      当前打开：{{ activeItem || '无' }}
    </p>
  </section>
</template>
