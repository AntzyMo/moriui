---
title: Marker 内容标注
description: 用于内容标注场景的 MoriUI 组件。
---

# Marker 内容标注

用于内容标注场景的 MoriUI 组件。

## 导入

```ts
import { Marker, MarkerContent, MarkerIcon } from 'moriui'
```

## 示例

### 概览

在内容流中标记时间。

::component-preview{name="marker-demo"}
::

### 变体

对比三种公开变体。

::component-preview{name="marker-variants"}
::

### 状态

用文字与实时区域表达保存状态。

::component-preview{name="marker-status"}
::

### 分隔线

在分隔线上放置可读标签。

::component-preview{name="marker-separator"}
::

### 描边

描边标记同时提供状态名称。

::component-preview{name="marker-border"}
::

### 带图标

装饰图标与文本组合。

::component-preview{name="marker-icon"}
::

### 链接与按钮

在标记中放置明确操作。

::component-preview{name="marker-link-button"}
::

## 使用说明

### 组合方式

Marker 组合 MarkerIcon 与 MarkerContent，在时间线或内容流中提供轻量标注。

### 特性

当前公开能力包含 default、border、separator 三种变体；不登记 MoriUI 未实现的 shimmer。

### 状态与进度

动态状态使用 role=status/aria-live，进度需要明确文本或专用 Progress。

### 有标签的分隔线

separator 变体用作结构分隔时提供 role=separator 与可访问名称。

### 带边框标记

border 是视觉变化；状态含义仍需由文本或 aria-label 提供。

### 装饰图标

重复文字含义的图标应 aria-hidden，独立图标需要可访问名称。

### 交互标记

需要点击的 Marker 使用 as 渲染为 a/button，或把明确的 Button 放在标记中。

## 变体

Marker variant 支持 default、border 与 separator。

## 可访问性

状态与进度使用合适的实时区域；分隔用途提供 separator 语义；图标不能成为唯一含义来源；交互标记使用 a 或 button。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Marker variant` | `'default' \| 'border' \| 'separator'` | `'default'` | 标记的视觉结构。 |
| `Marker as` | `string \| Component` | `'div'` | Marker 根元素。 |
| `Marker asChild` | `boolean` | `false` | 将样式合并到唯一子元素。 |
| `MarkerIcon class` | `HTMLAttributes["class"]` | `undefined` | 合并到标记图标区域的调用方类。 |
| `MarkerContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到标记内容区域的调用方类。 |
