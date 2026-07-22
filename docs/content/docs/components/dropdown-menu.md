---
title: Dropdown Menu 下拉菜单
description: 用于下拉菜单场景的 MoriUI 组件。
---

# Dropdown Menu 下拉菜单

用于下拉菜单场景的 MoriUI 组件。

## 导入

```ts
import { DropdownMenu, DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from 'moriui'
```

## 示例

### 概览

账户与设置的下拉菜单。

::component-preview{name="dropdown-menu-demo"}
::

### 基础

最小化的菜单内容。

::component-preview{name="dropdown-menu-basic"}
::

### 图标

为菜单项添加图标。

::component-preview{name="dropdown-menu-icons"}
::

### 复选项

CheckboxItem 支持多选状态。

::component-preview{name="dropdown-menu-checkboxes"}
::

### 图标复选项

带图标的复选菜单项。

::component-preview{name="dropdown-menu-checkboxes-icons"}
::

### 单选项

RadioItem 与 RadioGroup 管理唯一选择。

::component-preview{name="dropdown-menu-radio-group"}
::

### 图标单选项

带图标的单选菜单项。

::component-preview{name="dropdown-menu-radio-icons"}
::

### 快捷键

Shortcut 展示菜单项的键位提示。

::component-preview{name="dropdown-menu-shortcuts"}
::

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级菜单。

::component-preview{name="dropdown-menu-submenu"}
::

### 破坏性

使用样式区分危险操作。

::component-preview{name="dropdown-menu-destructive"}
::

### 头像

在 Trigger 中使用头像。

::component-preview{name="dropdown-menu-avatar"}
::

### 复杂

组合多种菜单项类型的场景。

::component-preview{name="dropdown-menu-complex"}
::

### RTL

菜单在 RTL 上下文中的定位。

::component-preview{name="dropdown-menu-rtl"}
::

## 使用说明

### 组合方式

DropdownMenu 由 Trigger、Content、Item、Separator、Group、Label 与 Sub 组成，CheckboxItem 和 RadioItem 提供选择能力。

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。

### 复选与单选

CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。

### RTL

dir 控制弹层定位与方向键行为。

## 变体

DropdownMenuContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。

## 可访问性

DropdownMenu 复用 Reka UI 的 menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应有 aria-haspopup；Content 内需要为 Label 等提供合适的语义。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `DropdownMenu v-model:open` | `boolean` | `undefined` | 菜单的受控打开状态。 |
| `DropdownMenu defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `DropdownMenuTrigger as / asChild` | `string \| Component / boolean` | `'button' / false` | 触发器的元素组合能力。 |
| `DropdownMenuContent side / align` | `PopperContentProps` | `'bottom' / 'start'` | 弹层方向与对齐。 |
| `DropdownMenuItem disabled` | `boolean` | `false` | 禁用菜单项。 |
| `DropdownMenuCheckboxItem v-model` | `boolean \| 'indeterminate'` | `undefined` | 复选框的选中状态。 |
| `DropdownMenuRadioItem value` | `AcceptableValue` | `—` | 必填的单选项值。 |
| `DropdownMenuRadioGroup v-model` | `AcceptableValue` | `undefined` | 单选组当前值。 |
| `DropdownMenuSeparator class` | `HTMLAttributes["class"]` | `undefined` | 合并到分隔线的调用方类。 |
| `DropdownMenuLabel class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签的调用方类。 |
| `DropdownMenuSub v-model:open` | `boolean` | `undefined` | 子菜单的受控打开状态。 |
| `DropdownMenuSubTrigger disabled` | `boolean` | `false` | 禁用子菜单触发器。 |
| `DropdownMenuShortcut class` | `HTMLAttributes["class"]` | `undefined` | 合并到快捷键标签的调用方类。 |
