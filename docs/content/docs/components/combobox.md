---
title: Combobox 可搜索选择
description: 支持搜索筛选的选择输入框。
group: 表单
related:
  - select
---

## 引入

```vue
import { Combobox, ComboboxAnchor, ComboboxCancel, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'moriui'
```

## 示例

### 概览

::component-preview{name="combobox-demo"}
可筛选的单选框架列表。
::

### 基础

::component-preview{name="combobox-basic"}
Anchor、Input、Viewport 与 Item 的最小组合。
::

### 多选

::component-preview{name="combobox-multiple"}
multiple 与数组 v-model 管理多个选择。
::

### 清空

::component-preview{name="combobox-clear"}
ComboboxCancel 清空筛选并按配置重置值。
::

### 分组

::component-preview{name="combobox-groups"}
Group、Label 与 Separator 组织选项。
::

### 自定义项目

::component-preview{name="combobox-custom"}
在 ComboboxItem 中组合丰富内容。
::

### 无效

::component-preview{name="combobox-invalid"}
输入使用 aria-invalid。
::

### 禁用

::component-preview{name="combobox-disabled"}
根组件 disabled 阻止所有交互。
::

### 高亮

::component-preview{name="combobox-auto-highlight"}
Reka UI 管理高亮项目与键盘导航。
::

### 独立触发器

::component-preview{name="combobox-popup"}
Trigger 打开包含搜索输入的弹层。
::

### 带图标输入

::component-preview{name="combobox-input-group"}
Anchor 内组合图标、输入和触发器。
::

### RTL

::component-preview{name="combobox-rtl"}
搜索与弹层在 RTL 上下文中工作。
::

MoriUI 使用 Reka 的 Anchor、Input、Content、Viewport 与 Item 组合；不提供 Base UI 的 List、Collection 或 Chips API。ComboboxItem 的 value 使用真实 AcceptableValue；复杂视觉可放入 Item，但筛选文本仍应清晰。multiple 时 v-model 是值数组，选择后浮层保持打开。在 ComboboxInput 设置 aria-invalid，在 Combobox 根设置 disabled；行为与状态来自 Reka UI。dir 会同时影响输入、弹层定位与键盘逻辑方向。

Combobox 没有公开视觉变体；open、highlight、selected、disabled、invalid 和 side 等状态来自 Reka UI 属性。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Combobox v-model` | `AcceptableValue \| AcceptableValue[]` | `undefined / []` | 单选或 multiple 多选值 |
| `Combobox v-model:open` | `boolean` | `undefined` | 受控浮层开关状态 |
| `multiple / disabled` | `boolean` | `false` | 多选模式与整体禁用状态 |
| `openOnClick / openOnFocus` | `boolean` | `true / false` | 输入交互是否打开浮层 |
| `ignoreFilter` | `boolean` | `false` | 关闭 Reka 内置筛选，交给调用方过滤 |
| `resetModelValueOnClear` | `boolean` | `false` | 清空筛选时是否同步清空选择值 |
| `ComboboxItem value` | `AcceptableValue` | `—` | 必填项目值 |
| `ComboboxContent side / align` | `PopperContentProps` | `'bottom' / 'start'` | Reka Popper 的定位属性 |

## 无障碍

Combobox 复用 Reka UI 的 combobox/listbox ARIA、活动后代、方向键、Enter 选择、Escape 关闭与 Teleport。输入必须有名称；无结果文案、项目文本和禁用/无效状态都应可被辅助技术理解。
