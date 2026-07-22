---
title: Popover 弹出卡片
description: 用于弹出卡片场景的 MoriUI 组件。
---

# Popover 弹出卡片

用于弹出卡片场景的 MoriUI 组件。

## 导入

```ts
import { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from 'moriui'
```

## 示例

### 概览

Popover 的基本结构与标题、说明。

::component-preview{name="popover-demo"}
::

### 表单

在 Popover 中放置表单字段。

::component-preview{name="popover-form"}
::

### 对齐

使用 align 控制内容对齐方向。

::component-preview{name="popover-alignments"}
::

### RTL

从右到左的弹出卡片布局。

::component-preview{name="popover-rtl"}
::

## 使用说明

### 组合方式

Popover 由 Trigger、Content 组成；Content 内可使用 Header、Title 与 Description 提供清晰结构。

### 定位

Content 的 align 与 side 控制弹出卡片的方向和对齐。

### RTL

方向由 DirectionProvider 控制。

## 变体

PopoverContent 的 align 与 side 来自 Reka Popper 定位。

## 可访问性

Popover 复用 Reka UI 的 Popper 定位、焦点管理、Escape 关闭与 DismissableLayer。Content 内应提供 PopoverTitle，并在需要时补充 PopoverDescription。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Popover v-model:open` | `boolean` | `undefined` | 弹出卡的受控打开状态。 |
| `Popover defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `Popover modal` | `boolean` | `true` | 弹出卡打开时是否阻断背景交互。 |
| `PopoverContent side / align` | `PopperContentProps` | `'bottom' / 'center'` | 卡片方向与对齐。 |
| `PopoverContent sideOffset` | `number` | `4` | 卡片与触发器的偏移像素。 |
| `PopoverHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到卡片头部的调用方类。 |
| `PopoverAnchor as / asChild` | `string \| Component / boolean` | `'div' / false` | 自定义锚点的元素组合能力。 |
