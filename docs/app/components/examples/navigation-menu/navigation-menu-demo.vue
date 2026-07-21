<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
  } from 'moriui'

  interface ListItemProps {
    title: string
    href?: string
    class?: HTMLAttributes['class']
  }

  const components: { title: string, description: string }[] = [
    { title: '弹窗', description: '模态对话框，用于重要操作确认' },
    { title: '悬浮卡片', description: '为有视力的用户预览链接内容' },
    { title: '进度条', description: '显示任务完成进度的指示器' },
    { title: '滚动区域', description: '自定义滚动条样式的内容区域' },
    { title: '标签页', description: '分层内容的面板切换组件' },
    { title: '工具提示', description: '元素聚焦或悬停时弹出的信息' }
  ]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>概览</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="w-72 p-2">
            <li v-for="item in [{ title: '介绍', desc: '基于 Reka UI 的 Vue 组件库' }, { title: '安装', desc: '依赖安装与应用结构指南' }, { title: '快速开始', desc: '几分钟内搭建你的第一个页面' }]" :key="item.title">
              <NavigationMenuLink class="flex flex-col gap-1 p-2">
                <span class="text-sm font-medium leading-none">{{ item.title }}</span>
                <span class="text-xs text-muted-foreground line-clamp-2">{{ item.desc }}</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>组件</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[22rem] gap-1 p-2 md:w-[28rem] md:grid-cols-2">
            <li v-for="c in components" :key="c.title">
              <NavigationMenuLink class="flex flex-col gap-1 p-2">
                <span class="text-sm font-medium leading-none">{{ c.title }}</span>
                <span class="text-xs text-muted-foreground line-clamp-2">{{ c.description }}</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>文档</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="w-56 p-2">
            <li>
              <NavigationMenuLink class="flex flex-col gap-1 p-2">
                <span class="text-sm font-medium leading-none">入门指南</span>
                <span class="text-xs text-muted-foreground">了解核心概念与用法</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink class="flex flex-col gap-1 p-2">
                <span class="text-sm font-medium leading-none">自定义主题</span>
                <span class="text-xs text-muted-foreground">通过 Token 定制视觉风格</span>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink class="flex flex-col gap-1 p-2">
                <span class="text-sm font-medium leading-none">无障碍</span>
                <span class="text-xs text-muted-foreground">遵循 WAI-ARIA 标准</span>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink class="text-sm font-medium">
          指南
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
