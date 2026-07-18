---
title: 安装
description: 安装 MoriUI、接入样式并渲染第一个组件。
---

# 安装

下面的步骤以使用 pnpm 的 Vue 3 项目为例。MoriUI 依赖 Tailwind CSS 4，并把所有组件样式汇总在一个公开入口中。

## 安装依赖

在项目目录安装组件包与 Tailwind 的 Vite 插件：

```bash
pnpm add moriui
pnpm add -D tailwindcss @tailwindcss/vite
```

然后按 Tailwind CSS 4 的方式把 `@tailwindcss/vite` 加入 Vite 插件列表。

## 引入样式

在应用的全局样式文件中保持这两个导入，并确保该文件由应用入口加载：

```css
@import "tailwindcss";
@import "moriui/style.css";
```

不需要逐个引入组件样式，也不需要复制 Nova 的主题变量。

## 第一个组件

组件可以直接在 Vue 单文件组件中导入并组合：

```vue
<script setup lang="ts">
  import { Button } from 'moriui'
</script>

<template>
  <Button>保存更改</Button>
</template>
```

确认按钮能以键盘聚焦并显示 Nova 样式后，就可以继续添加其他组件。
