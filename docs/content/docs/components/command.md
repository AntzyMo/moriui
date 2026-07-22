---
title: Command 命令调度
description: 用于命令调度场景的 MoriUI 组件。
---

# Command 命令调度

用于命令调度场景的 MoriUI 组件。

## 导入

```ts
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from 'moriui'
```

## 示例

### 概览

可搜索的命令面板。

::component-preview{name="command-demo"}
::

### 基础

最小化的命令列表。

::component-preview{name="command-basic"}
::

### 对话框

CommandDialog 将命令面板置于模态内。

::component-preview{name="command-dialog"}
::

### 分组

Group 与 Separator 组织命令类别。

::component-preview{name="command-groups"}
::

### 可滚动

长列表在 CommandList 中滚动。

::component-preview{name="command-scrollable"}
::

### 快捷键

CommandShortcut 显示键位提示。

::component-preview{name="command-shortcuts"}
::

### RTL

命令面板在 RTL 页面中工作。

::component-preview{name="command-rtl"}
::

## 使用说明

### 组合方式

Command 基于 Reka Combobox 构建，使用 Input、List、Group、Item、Empty 与 Separator 组合快速命令面板。

### 对话框模式

CommandDialog 将命令面板包裹在模态 Dialog 中，适合全局快捷键唤醒的搜索场景。

### 分组

CommandGroup 通过 heading 属性提供标题，CommandSeparator 在组间建立视觉边界。

### RTL

搜索输入与项目列表沿 dir 排列。

## 变体

Command 没有公开视觉变体；打开、高亮与选中状态由 Reka Combobox 属性驱动。

## 可访问性

Command 复用 Reka Combobox 的 combobox/listbox ARIA、方向键导航、Enter 选择与筛选。CommandDialog 额外使用 Dialog 的焦点管理。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Command v-model` | `AcceptableValue \| AcceptableValue[]` | `undefined` | 单选或多选值。 |
| `Command multiple / disabled` | `boolean` | `false` | 多选模式与整体禁用。 |
| `Command ignoreFilter` | `boolean` | `false` | 关闭内置筛选，由调用方控制。 |
| `CommandInput v-model` | `string` | `''` | 搜索输入值。 |
| `CommandInput placeholder` | `string` | `'输入命令或搜索…'` | 输入占位提示。 |
| `CommandDialog v-model:open` | `boolean` | `undefined` | 对话框的受控打开状态。 |
| `CommandDialog title` | `string` | `'命令面板'` | 对话框标题。 |
| `CommandDialog description` | `string` | `'搜索并执行命令。'` | 对话框辅助说明。 |
| `CommandGroup heading` | `string` | `undefined` | 分组标题。 |
| `CommandItem value` | `AcceptableValue` | `—` | 必填的项目值。 |
