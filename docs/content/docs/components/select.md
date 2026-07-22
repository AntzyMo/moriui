---
title: Select 下拉选择
description: 用于下拉选择场景的 MoriUI 组件。
---

# Select 下拉选择

用于下拉选择场景的 MoriUI 组件。

## 导入

```ts
import { Select, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport } from 'moriui'
```

## 示例

### 概览

组合水果选项与受控 v-model。

::component-preview{name="select-demo"}
::

### 对齐已选项

用真实 position API 切换 item-aligned 与 popper 定位。

::component-preview{name="select-align-item"}
::

### 分组

Group、Label 与 Separator 区分水果和蔬菜。

::component-preview{name="select-groups"}
::

### 可滚动

Viewport 与滚动按钮承载跨地区时区列表。

::component-preview{name="select-scrollable"}
::

### 禁用

根组件 disabled 阻止打开与选择。

::component-preview{name="select-disabled"}
::

### 无效

Trigger 的 aria-invalid 与 FieldError 提供完整错误反馈。

::component-preview{name="select-invalid"}
::

### RTL

阿拉伯语分组选项在 RTL 弹层中工作。

::component-preview{name="select-rtl"}
::

## 使用说明

### 组合方式

Select 组合 Trigger/Value 与 Teleport 的 Content/Viewport；项目由 Item、ItemText 和 Indicator 组成。

### 定位方式

SelectContent 使用 position="item-aligned" 对齐已选项，或使用默认 popper 相对触发器定位。

### 分组与滚动

Group、Label 与 Separator 组织长列表；Viewport 和上下滚动按钮处理超出可用高度的选项。

### 禁用与无效

根组件 disabled 阻止全部交互，Item 也可单独禁用；Trigger 使用 aria-invalid 表达无效状态。

### RTL

dir 同时影响触发器、弹层定位、选项阅读和方向键行为。

## 变体

SelectTrigger 的 size 支持 sm/default；SelectContent position 支持 item-aligned/popper。其他视觉状态由 open、highlighted、checked、disabled、invalid 与 side 属性驱动。

## 可访问性

Select 复用 Reka UI 的 listbox ARIA、焦点管理、类型搜索、方向键、Enter/Space 选择、Escape 关闭与触发器焦点归还。Trigger 必须有名称，ItemText 应提供清晰文本，错误需配合 aria-invalid 与可读说明。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Select v-model` | `AcceptableValue \| AcceptableValue[]` | `undefined / []` | 单选或 multiple 多选值。 |
| `Select v-model:open` | `boolean` | `undefined` | 受控弹层开关状态。 |
| `Select defaultValue / defaultOpen` | `AcceptableValue \| AcceptableValue[] / boolean` | `undefined / false` | 非受控初始值与初始打开状态。 |
| `Select multiple / disabled` | `boolean` | `false` | 多选模式与整体禁用状态。 |
| `Select by` | `string \| ((a, b) => boolean)` | `undefined` | 对象值的比较字段或比较函数。 |
| `SelectTrigger size` | `'sm' \| 'default'` | `'default'` | 触发器尺寸。 |
| `SelectContent position` | `'item-aligned' \| 'popper'` | `'popper'` | 弹层相对已选项或触发器的定位方式。 |
| `SelectContent side / align` | `PopperContentProps` | `'bottom' / 'center'` | popper 模式的方向与对齐。 |
| `SelectItem value / disabled` | `AcceptableValue / boolean` | `— / false` | 必填项目值与单项禁用状态。 |
