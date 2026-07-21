---
title: Skeleton 加载占位
description: 内容加载时的占位骨架。
group: 基础
related:
  - card
  - item
---

## 引入

```vue
import { Skeleton } from 'moriui'
```

## 示例

### 概览

::component-preview{name="skeleton-demo"}
头像与文字占位组合。
::

### 头像

::component-preview{name="skeleton-avatar"}
模拟成员条目加载。
::

### 卡片

::component-preview{name="skeleton-card"}
模拟媒体卡片加载。
::

### 文本

::component-preview{name="skeleton-text"}
模拟多行文字加载。
::

### 表单

::component-preview{name="skeleton-form"}
模拟标签、输入与按钮。
::

### 表格

::component-preview{name="skeleton-table"}
模拟表头与多行数据。
::

### RTL

::component-preview{name="skeleton-rtl"}
占位形状按 RTL 内容布局排列。
::

Skeleton 只占位布局；在 RTL 页面中应按最终内容的逻辑方向排列。

Skeleton 没有公开变体；通过 class 指定最终内容对应的宽高和圆角。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `as` | `string \| Component` | `'div'` | 占位元素 |
| `asChild` | `boolean` | `false` | 将占位样式合并到唯一子元素 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 设置与真实内容一致的尺寸和形状 |

## 无障碍

Skeleton 本身不应被当作内容朗读；加载区域应由外围使用 aria-busy，并为持续时间较长的加载提供可读状态文本。
