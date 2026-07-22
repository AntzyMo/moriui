---
title: Pagination 页码导航
description: 用于页码导航场景的 MoriUI 组件。
---

# Pagination 页码导航

用于页码导航场景的 MoriUI 组件。

## 导入

```ts
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationList, PaginationNext, PaginationPrev } from 'moriui'
```

## 示例

### 概览

页码导航与上一页/下一页。

::component-preview{name="pagination-demo"}
::

### 简洁

仅上一页/下一页。

::component-preview{name="pagination-simple"}
::

### 仅图标

仅图标的分页按钮。

::component-preview{name="pagination-icons-only"}
::

### RTL

从右到左的分页导航。

::component-preview{name="pagination-rtl"}
::

## 使用说明

### 组合方式

Pagination 通过 List 组织 Item，Item 包含页码，可选 Ellipsis、First、Last、Prev、Next 等导航子组件。

### RTL

方向由 DirectionProvider 控制。

## 变体

Pagination 没有视觉变体；当前页码通过 Reka UI 自动管理。

## 可访问性

Pagination 默认输出 role="navigation" 和 aria-label="Pagination"。列表使用 role="list"，当前页使用 aria-current="page"。导航按钮图标应提供 aria-label。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `PaginationList class` | `HTMLAttributes["class"]` | `undefined` | 合并到页码列表的调用方类。 |
| `PaginationItem class` | `HTMLAttributes["class"]` | `undefined` | 合并到页码项的调用方类。 |
| `PaginationPrev / Next href` | `string` | `undefined` | 导航按钮的链接地址。 |
| `PaginationEllipsis class` | `HTMLAttributes["class"]` | `undefined` | 合并到省略号的调用方类。 |
