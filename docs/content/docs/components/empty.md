---
title: Empty 空白状态
description: 数据为空时的占位提示。
group: 基础
related:
  - button
  - item
---

## 引入

```vue
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from 'moriui'
```

## 示例

### 概览

::component-preview{name="empty-demo"}
标准空状态与主要操作。
::

### 描边

::component-preview{name="empty-outline"}
虚线边界强调可放置区域。
::

### 背景

::component-preview{name="empty-background"}
弱化背景区分空状态范围。
::

### 头像

::component-preview{name="empty-avatar"}
使用头像表达成员相关空状态。
::

### 头像组

::component-preview{name="empty-avatar-group"}
以成员集合说明协作场景。
::

### 输入组合

::component-preview{name="empty-input-group"}
将下一步搜索操作放在内容区。
::

### RTL

::component-preview{name="empty-rtl"}
空状态支持从右到左内容。
::

Empty 用 Header 组织 Media、Title、Description，并将主要操作放入 Content。空状态继承外部 dir，说明和操作顺序适配 RTL 内容。

Empty 根组件没有视觉变体；EmptyMedia variant 支持 default 与 icon。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Empty class` | `HTMLAttributes["class"]` | `undefined` | 合并到空状态根容器的调用方类 |
| `EmptyHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到空状态页眉的调用方类 |
| `EmptyMedia variant` | `'default' \| 'icon'` | `'default'` | 媒体区域是否使用图标表面 |
| `EmptyTitle class` | `HTMLAttributes["class"]` | `undefined` | 合并到空状态标题的调用方类 |
| `EmptyDescription class` | `HTMLAttributes["class"]` | `undefined` | 合并到空状态说明的调用方类 |
| `EmptyContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到空状态操作区的调用方类 |

## 无障碍

EmptyTitle 应清楚描述当前状态，Description 说明原因或下一步；主要操作使用 Button。异步切换为空状态时，由外围按需提供 aria-live。
