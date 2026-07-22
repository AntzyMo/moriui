---
title: Scroll Area 滚动区域
description: 用于滚动区域场景的 MoriUI 组件。
---

# Scroll Area 滚动区域

用于滚动区域场景的 MoriUI 组件。

## 导入

```ts
import { ScrollArea, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'moriui'
```

## 示例

### 概览

长文本垂直滚动。

::component-preview{name="scroll-area-demo"}
::

### 横向

横向内容滚动。

::component-preview{name="scroll-area-horizontal-demo"}
::

### RTL

从右到左的滚动区域。

::component-preview{name="scroll-area-rtl"}
::

## 使用说明

### 组合方式

ScrollArea 由 Viewport、Scrollbar、Thumb 和 Corner 组成。

### 方向

orientation 支持 vertical 和 horizontal。

### RTL

滚动条的左右定位在 RTL 中翻转。

## 变体

ScrollArea 的 type 支持 auto/scroll/always/hover；orientation 支持 vertical/horizontal。

## 可访问性

ScrollArea 视图应包含内容本身的语义，滚动条不干扰 Tab 顺序。内容在滚动时始终可读。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ScrollArea type` | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'auto'` | 滚动条显示模式。 |
| `ScrollAreaViewport class` | `HTMLAttributes["class"]` | `undefined` | 合并到视口的调用方类。 |
| `ScrollAreaScrollbar orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 滚动条方向。 |
| `ScrollAreaThumb class` | `HTMLAttributes["class"]` | `undefined` | 合并到滚动条滑块的调用方类。 |
| `ScrollAreaCorner class` | `HTMLAttributes["class"]` | `undefined` | 合并到滚动条角落的调用方类。 |
