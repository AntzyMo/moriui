---
title: Aspect Ratio 比例容器
description: 用于比例容器场景的 MoriUI 组件。
---

# Aspect Ratio 比例容器

用于比例容器场景的 MoriUI 组件。

## 导入

```ts
import { AspectRatio } from 'moriui'
```

## 示例

### 概览

以 16:9 比例展示常见横向媒体。

::component-preview{name="aspect-ratio-demo"}
::

### 方形

ratio=1 创建稳定的正方形区域。

::component-preview{name="aspect-ratio-square"}
::

### 竖向

ratio=9/16 适合竖向封面。

::component-preview{name="aspect-ratio-portrait"}
::

### RTL

比例容器可安全放入 RTL 页面。

::component-preview{name="aspect-ratio-rtl"}
::

## 使用说明

### RTL

比例计算与文字方向无关；在 RTL 容器中，内部内容继续继承正确的 dir 语义。

## 变体

AspectRatio 没有视觉变体；通过 ratio 定义宽高比，并由内容决定表面样式。

## 可访问性

比例容器只负责布局，不改变内容语义。媒体仍需提供 alt，纯装饰内容应使用空 alt 或合适的隐藏方式。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `AspectRatio ratio` | `number` | `1` | 目标宽高比，例如 16 / 9。 |
| `AspectRatio as` | `string \| Component` | `'div'` | 内部承载内容的元素或组件。 |
| `AspectRatio asChild` | `boolean` | `false` | 将内部原语行为合并到唯一子元素。 |
