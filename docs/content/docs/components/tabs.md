---
title: Tabs 选项卡
description: 用于选项卡场景的 MoriUI 组件。
---

# Tabs 选项卡

用于选项卡场景的 MoriUI 组件。

## 导入

```ts
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
```

## 示例

### 概览

标签切换展示不同内容。

::component-preview{name="tabs-demo"}
::

### 线条

使用 variant="line" 线条样式。

::component-preview{name="tabs-line"}
::

### 垂直

纵向排列的标签。

::component-preview{name="tabs-vertical"}
::

### 禁用

禁用某个标签。

::component-preview{name="tabs-disabled"}
::

### 图标

标签带图标。

::component-preview{name="tabs-icons"}
::

### RTL

从右到左的标签布局。

::component-preview{name="tabs-rtl"}
::

## 使用说明

### 组合方式

Tabs 由 List、Trigger 和 Content 组成；List 内 Trigger 控制对应 Content 的显示。

### 线条变体

TabsList 的 variant="line" 切换为下划线指示器样式。

### 垂直方向

orientation="vertical" 使标签垂直排列。

### 禁用标签

TabsTrigger 支持 disabled 属性。

### RTL

方向由 DirectionProvider 控制。

## 变体

TabsList 的 variant 支持 default 与 line；orientation 支持 horizontal 与 vertical。

## 可访问性

Tabs 复用 Reka UI 的 tablist/tab/tabpanel ARIA、方向键导航和 aria-selected/aria-controls。TabTrigger 应提供清晰标签。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Tabs v-model` | `string` | `undefined` | 当前激活标签的值。 |
| `Tabs defaultValue` | `string` | `undefined` | 非受控初始激活标签。 |
| `Tabs orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 标签排列方向。 |
| `Tabs activationMode` | `'automatic' \| 'manual'` | `'automatic'` | 标签激活方式（自动/手动）。 |
| `TabsList variant` | `'default' \| 'line'` | `'default'` | 标签栏视觉变体。 |
| `TabsList class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签栏的调用方类。 |
| `TabsTrigger value` | `string` | `—` | 必填，关联的标签值。 |
| `TabsTrigger disabled` | `boolean` | `false` | 禁用此标签。 |
| `TabsContent value` | `string` | `—` | 必填，关联的标签值。 |
| `TabsContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到内容区域的调用方类。 |
