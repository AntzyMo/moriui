---
title: Bubble 对话气泡
description: 对话消息气泡组件。
group: 基础
related:
  - avatar
  - tooltip
---

## 引入

```vue
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from 'moriui'
```

## 示例

### 概览

::component-preview{name="bubble-demo"}
组合接收与发送消息。
::

### 变体

::component-preview{name="bubble-variants"}
展示当前公开视觉变体。
::

### 对齐

::component-preview{name="bubble-alignment"}
使用 align 区分会话双方。
::

### 消息组

::component-preview{name="bubble-group-demo"}
连续消息由 BubbleGroup 统一排列。
::

### 链接与按钮

::component-preview{name="bubble-link-button"}
消息内容可包含语义明确的操作。
::

### 回应

::component-preview{name="bubble-reactions"}
BubbleReactions 组织紧凑操作。
::

### 展开更多

::component-preview{name="bubble-collapsible"}
与 Collapsible 组合长消息。
::

### 提示

::component-preview{name="bubble-tooltip"}
交互气泡可与 Tooltip 组合。
::

Bubble 负责变体与对齐，BubbleContent 承载消息，BubbleReactions 和 BubbleGroup 分别组织回应与连续消息。当前公开能力包括七种视觉变体、起止对齐以及回应区域的 side/align。仅图标回应按钮必须使用 aria-label，回应容器应有描述其用途的可访问名称。只有整个气泡确实触发操作时才将 Bubble 渲染为 button 或链接；普通消息保持非交互元素。错误、发送中等状态应同时提供文字或图标，不能只依赖 variant 颜色。

Bubble variant 支持 default、secondary、muted、tinted、outline、ghost、destructive；align 支持 start/end。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Bubble variant` | `'default' \| 'secondary' \| 'muted' \| 'tinted' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | 消息视觉层级 |
| `Bubble align` | `'start' \| 'end'` | `'start'` | 消息在会话流中的对齐方向 |
| `BubbleContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到消息内容区域的调用方类 |
| `BubbleReactions side` | `'top' \| 'bottom'` | `'bottom'` | 回应区域相对气泡的位置 |
| `BubbleReactions align` | `'start' \| 'end'` | `'end'` | 回应区域的水平对齐 |
| `BubbleGroup class` | `HTMLAttributes["class"]` | `undefined` | 合并到连续消息分组的调用方类 |
| `Bubble as / asChild` | `string \| Component / boolean` | `'div' / false` | 根、内容、分组与回应均支持 Reka Primitive 组合 |

## 无障碍

对话列表应由页面提供 log/list 等上下文；可交互气泡使用 button 或 a，回应按钮提供 aria-label，状态不能只靠颜色表达。
