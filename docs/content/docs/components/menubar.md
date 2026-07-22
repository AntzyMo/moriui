---
title: Menubar 应用菜单
description: 用于应用菜单场景的 MoriUI 组件。
---

# Menubar 应用菜单

用于应用菜单场景的 MoriUI 组件。

## 导入

```ts
import { Menubar, MenubarArrow, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarItemIndicator, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from 'moriui'
```

## 示例

### 概览

应用菜单栏展示菜单层级。

::component-preview{name="menubar-demo"}
::

### 图标

为菜单项添加图标。

::component-preview{name="menubar-icons"}
::

### 复选项

CheckboxItem 支持多选状态。

::component-preview{name="menubar-checkbox"}
::

### 单选项

RadioItem 与 RadioGroup 管理唯一选择。

::component-preview{name="menubar-radio"}
::

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级菜单。

::component-preview{name="menubar-submenu"}
::

### RTL

菜单在 RTL 上下文中的定位。

::component-preview{name="menubar-rtl"}
::

## 使用说明

### 组合方式

Menubar 由 Menu、Trigger 和 Content 组成，支持 Item、CheckboxItem、RadioItem、Separator、Label、Sub 和 Shortcut。

### 子菜单

Sub、SubTrigger 与 SubContent 构建多级嵌套菜单。

### 复选与单选

CheckboxItem 和 RadioItem 使用 Indicator 表达选中状态；RadioGroup 管理单项选择。

### RTL

方向由 DirectionProvider 控制。

## 变体

MenubarContent 的 side、align 来自 Reka Popper 定位，无公开视觉变体。

## 可访问性

Menubar 复用 Reka UI 的 menubar/menu ARIA、方向键导航、Enter/Space 选择与 Escape 关闭。Trigger 应有 aria-haspopup；Root 应有 aria-label。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `MenubarMenu value` | `string` | `—` | 菜单项唯一标识。 |
| `MenubarTrigger as / asChild` | `string \| Component / boolean` | `'button' / false` | 触发器的元素组合能力。 |
| `MenubarItem disabled` | `boolean` | `false` | 禁用菜单项。 |
| `MenubarCheckboxItem v-model` | `boolean \| 'indeterminate'` | `undefined` | 复选框的选中状态。 |
| `MenubarRadioItem value` | `AcceptableValue` | `—` | 必填的单选项值。 |
| `MenubarRadioGroup v-model` | `AcceptableValue` | `undefined` | 单选组当前值。 |
| `MenubarSeparator class` | `HTMLAttributes["class"]` | `undefined` | 合并到分隔线的调用方类。 |
| `MenubarLabel class` | `HTMLAttributes["class"]` | `undefined` | 合并到标签的调用方类。 |
| `MenubarSub v-model:open` | `boolean` | `undefined` | 子菜单的受控打开状态。 |
| `MenubarShortcut class` | `HTMLAttributes["class"]` | `undefined` | 合并到快捷键标签的调用方类。 |
