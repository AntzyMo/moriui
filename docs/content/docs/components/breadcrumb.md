---
title: Breadcrumb 路径导航
description: 用于路径导航场景的 MoriUI 组件。
---

# Breadcrumb 路径导航

用于路径导航场景的 MoriUI 组件。

## 导入

```ts
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'moriui'
```

## 示例

### 概览

面包屑导航展示页面层级。

::component-preview{name="breadcrumb-demo"}
::

### 基础

简单的路径导航链接。

::component-preview{name="breadcrumb-basic"}
::

### 自定义分隔符

替换默认分隔图标。

::component-preview{name="breadcrumb-separator"}
::

### 链接

使用 BreadcrumbLink 构建导航。

::component-preview{name="breadcrumb-link"}
::

### 省略

使用 BreadcrumbEllipsis 折叠长路径。

::component-preview{name="breadcrumb-ellipsis"}
::

### 菜单

Ellipsis 配合 DropdownMenu 展开路径。

::component-preview{name="breadcrumb-dropdown"}
::

### RTL

从右到左的面包屑导航。

::component-preview{name="breadcrumb-rtl"}
::

## 使用说明

### 组合方式

Breadcrumb 通过 List 组织 Item，Item 内为 Link 或 Page 表示当前页；Separator 和 Ellipsis 分别处理分隔与折叠。

### 自定义分隔符

BreadcrumbSeparator 的默认插槽可替换为任意分隔图标。

### 省略菜单

BreadcrumbEllipsis 可配合 DropdownMenu 展开被折叠的路径。

### RTL

面包屑沿 dir 逻辑方向排列，分隔符方向随之调整。

## 变体

Breadcrumb 没有视觉变体；各子组件通过 class 自定义间距和颜色。

## 可访问性

Breadcrumb 默认输出 role="navigation" 和 aria-label="Breadcrumb"，列表使用 role="list" 和 role="listitem"。当前页使用 BreadcrumbPage 且 aria-current="page"。链接有清晰目的名称。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `BreadcrumbList class` | `HTMLAttributes["class"]` | `undefined` | 合并到列表容器的调用方类。 |
| `BreadcrumbItem class` | `HTMLAttributes["class"]` | `undefined` | 合并到列表项的调用方类。 |
| `BreadcrumbLink href` | `string` | `—` | 导航链接目标地址。 |
| `BreadcrumbLink as / asChild` | `string \| Component / boolean` | `'a' / false` | 渲染为其他路由组件。 |
| `BreadcrumbPage class` | `HTMLAttributes["class"]` | `undefined` | 表示当前页的文字。 |
| `BreadcrumbSeparator class` | `HTMLAttributes["class"]` | `undefined` | 合并到分隔符的调用方类。 |
| `BreadcrumbEllipsis class` | `HTMLAttributes["class"]` | `undefined` | 合并到省略按钮的调用方类。 |
