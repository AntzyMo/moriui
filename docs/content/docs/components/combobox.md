---
title: Combobox 可搜索选择
description: 用于可搜索选择场景的 MoriUI 组件。
---

# Combobox 可搜索选择

用于可搜索选择场景的 MoriUI 组件。

## 导入

```ts
import { Combobox, ComboboxAnchor, ComboboxCancel, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'moriui'
```

## 示例

### 概览

可筛选的单选框架列表。

::component-preview{name="combobox-demo"}
::

### 基础

Anchor、Input、Viewport 与 Item 的最小组合。

::component-preview{name="combobox-basic"}
::

### 多选

multiple 与数组 v-model 管理多个选择。

::component-preview{name="combobox-multiple"}
::

### 清空

ComboboxCancel 清空筛选并按配置重置值。

::component-preview{name="combobox-clear"}
::

### 分组

Group、Label 与 Separator 组织选项。

::component-preview{name="combobox-groups"}
::

### 自定义项目

在 ComboboxItem 中组合丰富内容。

::component-preview{name="combobox-custom"}
::

### 无效

输入使用 aria-invalid。

::component-preview{name="combobox-invalid"}
::

### 禁用

根组件 disabled 阻止所有交互。

::component-preview{name="combobox-disabled"}
::

### 高亮

Reka UI 管理高亮项目与键盘导航。

::component-preview{name="combobox-auto-highlight"}
::

### 独立触发器

Trigger 打开包含搜索输入的弹层。

::component-preview{name="combobox-popup"}
::

### 带图标输入

Anchor 内组合图标、输入和触发器。

::component-preview{name="combobox-input-group"}
::

### RTL

搜索与弹层在 RTL 上下文中工作。

::component-preview{name="combobox-rtl"}
::

## 使用说明

### 组合方式

MoriUI 使用 Reka 的 Anchor、Input、Content、Viewport 与 Item 组合；不提供 Base UI 的 List、Collection 或 Chips API。

### 自定义项目

ComboboxItem 的 value 使用真实 AcceptableValue；复杂视觉可放入 Item，但筛选文本仍应清晰。

### 多选

multiple 时 v-model 是值数组，选择后浮层保持打开；当前 MoriUI 不发布 Base UI Chips 子组件。

### 无效与禁用

在 ComboboxInput 设置 aria-invalid，在 Combobox 根设置 disabled；行为与状态来自 Reka UI。

### RTL

dir 会同时影响输入、弹层定位与键盘逻辑方向。

## 变体

Combobox 没有公开视觉变体；open、highlight、selected、disabled、invalid 和 side 等状态来自 Reka UI 属性。

## 可访问性

Combobox 复用 Reka UI 的 combobox/listbox ARIA、活动后代、方向键、Enter 选择、Escape 关闭与 Teleport。输入必须有名称；无结果文案、项目文本和禁用/无效状态都应可被辅助技术理解。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Combobox v-model` | `AcceptableValue \| AcceptableValue[]` | `undefined / []` | 单选或 multiple 多选值。 |
| `Combobox v-model:open` | `boolean` | `undefined` | 受控浮层开关状态。 |
| `multiple / disabled` | `boolean` | `false` | 多选模式与整体禁用状态。 |
| `openOnClick / openOnFocus` | `boolean` | `true / false` | 输入交互是否打开浮层。 |
| `ignoreFilter` | `boolean` | `false` | 关闭 Reka 内置筛选，交给调用方过滤。 |
| `resetModelValueOnClear` | `boolean` | `false` | 清空筛选时是否同步清空选择值。 |
| `ComboboxItem value` | `AcceptableValue` | `—` | 必填项目值。 |
| `ComboboxContent side / align` | `PopperContentProps` | `'bottom' / 'start'` | Reka Popper 的定位属性。 |
