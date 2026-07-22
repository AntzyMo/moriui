---
title: Collapsible 展开收起
description: 用于展开收起场景的 MoriUI 组件。
---

# Collapsible 展开收起

用于展开收起场景的 MoriUI 组件。

## 导入

```ts
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'moriui'
```

## 示例

### 概览

展开或收起订单详情。

::component-preview{name="collapsible-demo"}
::

### 基础

最小化的展开收起。

::component-preview{name="collapsible-basic"}
::

### 文件目录

嵌套 Collapsible 展示目录结构。

::component-preview{name="collapsible-file-tree"}
::

### 设置面板

分组设置项展开。

::component-preview{name="collapsible-settings"}
::

### RTL

从右到左的折叠面板。

::component-preview{name="collapsible-rtl"}
::

## 使用说明

### 组合方式

Collapsible 由 Trigger 和 Content 组成，通过 v-model:open 控制展开状态。

### RTL

Collapsible 内容沿外围 dir 排列。

## 变体

Collapsible 没有视觉变体；open/closed 状态由 Reka UI 的 data-state 驱动。

## 可访问性

Collapsible 复用 Reka UI Collapsible 的 button 和 region 角色、aria-expanded、aria-controls 和隐藏内容管理。Trigger 应提供清晰可理解的控制标签。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Collapsible v-model:open` | `boolean` | `undefined` | 受控展开状态。 |
| `Collapsible defaultOpen` | `boolean` | `false` | 非受控初始展开状态。 |
| `Collapsible disabled` | `boolean` | `false` | 禁用交互。 |
| `CollapsibleTrigger as / asChild` | `string \| Component / boolean` | `'button' / false` | 触发器的元素组合能力。 |
| `CollapsibleContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到内容区的调用方类。 |
