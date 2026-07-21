---
title: Card 卡片
description: 结构化的内容容器。
group: 基础
related:
  - aspect-ratio
  - item
---

## 引入

```vue
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'moriui'
```

## 示例

### 概览

::component-preview{name="card-demo"}
完整卡片结构与操作。
::

### 小尺寸

::component-preview{name="card-small"}
::

### 自定义间距

::component-preview{name="card-spacing"}
::

### 边到边内容

::component-preview{name="card-edge-to-edge"}
::

### 图片

::component-preview{name="card-image"}
::

### RTL

::component-preview{name="card-rtl"}
::

Card size 支持 default 与 sm；`--card-spacing` 是公开的组件局部 Token。

## API 参考

### Card Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'default' \| 'sm'` | `'default'` | 卡片密度尺寸，同步设置 data-size |
| `CardHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片页眉的调用方类 |
| `CardTitle class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片标题的调用方类 |
| `CardDescription class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片说明的调用方类 |
| `CardAction class` | `HTMLAttributes["class"]` | `undefined` | 合并到页眉操作区的调用方类 |
| `CardContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片内容区的调用方类 |
| `CardFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片页脚的调用方类 |

## 无障碍

Card 是布局容器，不自动建立 landmark；按内容需要使用 aria-labelledby 或在外围选择 article/section。标题层级应与页面大纲一致。
