---
title: Table 数据表格
description: 用于数据表格场景的 MoriUI 组件。
---

# Table 数据表格

用于数据表格场景的 MoriUI 组件。

## 导入

```ts
import { Table } from 'moriui'
```

## 示例

### 概览

综合数据表格。

::component-preview{name="table-demo"}
::

### 操作

表格行内操作。

::component-preview{name="table-actions"}
::

### 底部

表格底部分页。

::component-preview{name="table-footer"}
::

### RTL

从右到左的表格布局。

::component-preview{name="table-rtl"}
::

## 使用说明

### 组合方式

Table 基于 TanStack Table 构建，接收 data 和 columns 作为输入，内置排序、筛选、分页和行选择能力。

### 尺寸

size 支持 default 和 sm，控制行的密度。

### 行选择

selectable 启用行选择复选框。

### RTL

表格内容沿 dir 排列。

## 变体

Table 的 size 支持 default 与 sm；支持排序、列筛选、全局搜索、分页和行选择。

## 可访问性

Table 输出原生 table 元素，配合 TanStack Table 的排序、选择和分页 ARIA。表头使用 scope="col"，排序按钮有 aria-sort。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Table data` | `TData[]` | `—` | 必填，表格数据数组。 |
| `Table columns` | `ColumnDef<TData>[]` | `—` | 必填，列定义数组。 |
| `Table size` | `'default' \| 'sm'` | `'default'` | 表格行密度。 |
| `Table selectable` | `boolean` | `false` | 是否显示行选择复选框。 |
| `Table pageSizeOptions` | `number[]` | `undefined` | 可选的每页条数选项。 |
| `Table searchPlaceholder` | `string` | `undefined` | 全局搜索占位提示。 |
| `Table emptyText` | `string` | `undefined` | 空数据显示文本。 |
