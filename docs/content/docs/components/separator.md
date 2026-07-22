---
title: Separator 内容分隔线
description: 用于内容分隔线场景的 MoriUI 组件。
---

# Separator 内容分隔线

用于内容分隔线场景的 MoriUI 组件。

## 导入

```ts
import { Separator } from 'moriui'
```

## 示例

### 概览

水平与垂直分隔线组合。

::component-preview{name="separator-demo"}
::

### 垂直

在同一行内容之间使用 vertical。

::component-preview{name="separator-vertical"}
::

### 菜单

分隔相关导航入口。

::component-preview{name="separator-menu"}
::

### 列表

在列表条目之间建立视觉边界。

::component-preview{name="separator-list"}
::

### RTL

在 RTL 导航中使用垂直分隔线。

::component-preview{name="separator-rtl"}
::

## 使用说明

### RTL

Separator 的 orientation 不受书写方向影响，周围内容顺序由外围 dir 控制。

## 变体

Separator 没有视觉变体；orientation 支持 horizontal 与 vertical。

## 可访问性

表达结构边界时保留默认 role=separator；纯装饰分隔线传 decorative。垂直分隔线由 Reka UI 自动提供 aria-orientation=vertical。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分隔线方向，并同步 data-orientation。 |
| `decorative` | `boolean` | `false` | 为 true 时使用 role=none 从无障碍树移除。 |
| `as / asChild` | `string \| Component / boolean` | `'div' / false` | 来自 Reka Separator 的元素组合能力。 |
