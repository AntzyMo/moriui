# MoriUI

MoriUI 是为 Vue 3 打造的现代组件库，提供一致、精致且开箱即用的界面基础与交互体验。

## 使用方式

消费项目先加载 Tailwind CSS v4，再加载 MoriUI 的完整样式入口：

```css
@import "tailwindcss";
@import "moriui/style.css";
```

```vue
<script setup lang="ts">
  import { Button } from 'moriui'
</script>

<template>
  <Button>保存</Button>
</template>
```

## 开发

```bash
pnpm typecheck
pnpm test
pnpm build
```
