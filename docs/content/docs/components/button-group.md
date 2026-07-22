---
title: Button Group 按钮编组
description: 用于按钮编组场景的 MoriUI 组件。
---

# Button Group 按钮编组

用于按钮编组场景的 MoriUI 组件。

## 导入

```ts
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from 'moriui'
```

## 示例

### 概览

把相关消息操作组成一组。

::component-preview{name="button-group-overview"}
::

### 方向

vertical 适合纵向工具条。

::component-preview{name="button-group-orientation"}
::

### 尺寸

各 Button 自己控制组内尺寸。

::component-preview{name="button-group-size"}
::

### 嵌套

嵌套组为复杂工具条建立间距边界。

::component-preview{name="button-group-nested"}
::

### 分隔线

非描边按钮之间可加入视觉分隔。

::component-preview{name="button-group-separator"}
::

### 拆分按钮

主操作与更多选项保持相邻。

::component-preview{name="button-group-split"}
::

### 输入框

将 Input 与提交按钮组合。

::component-preview{name="button-group-input"}
::

### 输入组合

嵌套 InputGroup 构建消息编辑器。

::component-preview{name="button-group-input-group"}
::

### 下拉入口

主动作与更多选项入口组成拆分操作。

::component-preview{name="button-group-dropdown"}
::

### 金额输入

文字前缀、输入框与确认动作共享边界。

::component-preview{name="button-group-select"}
::

### 助手菜单

MoriUI 尚未发布 Popover，此处以可操作的 DropdownMenu 承载助手选项。

::component-preview{name="button-group-popover"}
::

### RTL

在 RTL 文本流中保持自然顺序。

::component-preview{name="button-group-rtl"}
::

## 使用说明

### 组合方式

ButtonGroup 可组合 Button、Input、InputGroup、Separator 和 Text，并支持嵌套分组。

### 无障碍分组

根节点输出 role="group"；调用方应通过 aria-label 或 aria-labelledby 描述整组操作。

### 按钮组与切换组

ButtonGroup 适合立即执行的相关动作；可保持选择状态的选项应使用 ToggleGroup。

### RTL

横向组合沿逻辑方向排列，分隔线方向会根据父组 orientation 自动推导。

## 变体

ButtonGroup orientation 支持 horizontal/vertical；组内控件继续使用各自的 variant 与 size。

## 可访问性

ButtonGroup 自动输出 role="group"，但仍需 aria-label 或 aria-labelledby。Tab 在组内逐个访问按钮；需要单选/多选状态与方向键导航时应改用 ToggleGroup。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ButtonGroup orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分组排列方向，并写入 data-orientation。 |
| `ButtonGroup as / asChild` | `string \| Component / boolean` | `'div' / false` | 根分组的元素组合能力。 |
| `ButtonGroupSeparator orientation` | `'horizontal' \| 'vertical'` | `按父组推导` | 分隔线方向；缺省时与父组排列方向垂直。 |
| `ButtonGroupText as / asChild` | `string \| Component / boolean` | `'div' / false` | 文字槽位的语义元素。 |
