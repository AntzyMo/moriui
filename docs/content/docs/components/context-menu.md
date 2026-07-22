---
title: Context Menu 上下文菜单
description: 用于上下文菜单场景的 MoriUI 组件。
---

# Context Menu 上下文菜单

用于上下文菜单场景的 MoriUI 组件。

## 导入

```ts
import { ContextMenu, ContextMenuArrow, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from 'moriui'
```

## 示例

### 概览

右键菜单展示上下文操作。

::component-preview{name="context-menu-demo"}
::

### 基础

最小化的菜单内容。

::component-preview{name="context-menu-basic"}
::

### 图标

为菜单项添加图标。

::component-preview{name="context-menu-icons"}
::

### 复选项

CheckboxItem 支持多选状态。

::component-preview{name="context-menu-checkboxes"}
::

### 单选项

RadioItem 与 RadioGroup 管理唯一选择。

::component-preview{name="context-menu-radio"}
::

### 分组

Group 与 Label 组织菜单层级。

::component-preview{name="context-menu-groups"}
::

### 快捷键

Shortcut 展示菜单项的键位提示。

::component-preview{name="context-menu-shortcuts"}
::

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级菜单。

::component-preview{name="context-menu-submenu"}
::

### 破坏性

使用样式区分危险操作。

::component-preview{name="context-menu-destructive"}
::

### 定位

Content 的 side 控制弹出方向。

::component-preview{name="context-menu-sides"}
::

### RTL

菜单在 RTL 上下文中的定位。

::component-preview{name="context-menu-rtl"}
::

## 使用说明

### 组合方式

ContextMenu 由 Trigger、Content、Item、Separator、Group、Label 与 Sub 组成，CheckboxItem 和 RadioItem 支持选择和设置。

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。

### 复选与单选

CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。

### RTL

dir 控制弹层定位与方向键行为。

## 变体

ContextMenuContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。

## 可访问性

ContextMenu 复用 Reka UI 的 menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应表示其弹出行为；Content 内需要为 Label 等提供合适的语义。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ContextMenu v-model:open` | `boolean` | `undefined` | 右键菜单的受控打开状态。 |
| `ContextMenu defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `ContextMenuTrigger as / asChild` | `string \| Component / boolean` | `'span' / false` | 右键触发区域的元素组合能力。 |
| `ContextMenuContent side / align` | `PopperContentProps` | `'bottom' / 'start'` | 弹层方向与对齐。 |
| `ContextMenuItem disabled` | `boolean` | `false` | 禁用菜单项。 |
| `ContextMenuCheckboxItem v-model` | `boolean \| 'indeterminate'` | `undefined` | 复选框的选中状态。 |
| `ContextMenuRadioItem value` | `AcceptableValue` | `—` | 必填的单选项值。 |
| `ContextMenuSeparator class` | `HTMLAttributes["class"]` | `undefined` | 合并到分隔线的调用方类。 |
| `ContextMenuLabel class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签的调用方类。 |
| `ContextMenuSub v-model:open` | `boolean` | `undefined` | 子菜单的受控打开状态。 |
| `ContextMenuSubTrigger disabled` | `boolean` | `false` | 禁用子菜单触发器。 |
| `ContextMenuShortcut class` | `HTMLAttributes["class"]` | `undefined` | 合并到快捷键标签的调用方类。 |
