---
title: Badge 状态徽记
description: 用紧凑标签表达状态或分类。
group: 基础
related:
  - avatar
  - marker
---

## 引入

```vue
import { Badge } from 'moriui'
```

## 示例

### 概览

::component-preview{name="badge-demo"}
用紧凑标签表达状态。
::

### 变体

::component-preview{name="badge-variants"}
不同变体表达信息层级。
::

### 带图标

::component-preview{name="badge-icon"}
图标与文字共同表达已验证状态。
::

### 加载状态

::component-preview{name="badge-spinner"}
旋转图标提示同步仍在进行。
::

### 链接

::component-preview{name="badge-link"}
通过 as 渲染为语义链接。
::

### 自定义颜色

::component-preview{name="badge-colors"}
调用方 class 可覆盖局部颜色。
::

### RTL

::component-preview{name="badge-rtl"}
在 RTL 页面中保持自然的内容顺序。
::

徽记继承外围书写方向，图标与文本顺序会随内容流自然排列。

variant 支持 default、secondary、destructive、outline、ghost 与 link。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Badge variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | 徽记的视觉层级 |
| `Badge as` | `string \| Component` | `'span'` | 渲染元素或组件 |
| `Badge asChild` | `boolean` | `false` | 将样式合并到唯一子元素 |

## 无障碍

Badge 默认只是视觉标签；状态更新需要由外围区域提供 role=status 或 aria-live。仅图标徽记必须提供可访问名称，链接变体应渲染为 a。
