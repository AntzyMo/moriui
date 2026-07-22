---
title: Alert 通知提示
description: 用于通知提示场景的 MoriUI 组件。
---

# Alert 通知提示

用于通知提示场景的 MoriUI 组件。

## 导入

```ts
import { Alert, AlertAction, AlertDescription, AlertTitle } from 'moriui'
```

## 示例

### 概览

警告提示展示关键信息。

::component-preview{name="alert-demo"}
::

### 基础

默认变体用于通用提示。

::component-preview{name="alert-basic"}
::

### 破坏性

destructive 变体表达危险操作。

::component-preview{name="alert-destructive"}
::

### 自定义颜色

调用方可覆盖局部颜色。

::component-preview{name="alert-colors"}
::

### 操作

AlertAction 可放置关闭或更多操作。

::component-preview{name="alert-action"}
::

### RTL

在 RTL 页面中保持自然的内容顺序。

::component-preview{name="alert-rtl"}
::

## 使用说明

### 组合方式

Alert 由 Title、Description 和 Action 组成，适合在页面内展示即时反馈。

### 变体

variant 支持 default 与 destructive，通过颜色区分信息层级。

### RTL

Alert 继承外围书写方向；图标与文本顺序会随 dir 调整。

## 变体

Alert variant 支持 default 与 destructive。

## 可访问性

Alert 根元素默认包含 role="alert"，能够触发屏幕阅读器的即时朗读。动态出现的 Alert 会通过该角色自动宣告。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Alert variant` | `'default' \| 'destructive'` | `'default'` | 警报的视觉层级。 |
| `AlertTitle class` | `HTMLAttributes["class"]` | `undefined` | 合并到标题的调用方类。 |
| `AlertDescription class` | `HTMLAttributes["class"]` | `undefined` | 合并到说明的调用方类。 |
| `AlertAction class` | `HTMLAttributes["class"]` | `undefined` | 合并到操作区域的调用方类。 |
