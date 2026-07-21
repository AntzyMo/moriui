---
title: Checkbox 多选框
description: 多选状态切换控件。
group: 表单
related: []
---

## 引入

```vue
import { Checkbox } from 'moriui'
```

## 示例

### 概览

::component-preview{name="checkbox-demo"}
组合标签、说明、选中与禁用状态。
::

### 无效

::component-preview{name="checkbox-invalid"}
同步 aria-invalid 与 Field data-invalid。
::

### 基础

::component-preview{name="checkbox-basic"}
用 FieldLabel 建立明确标签关联。
::

### 说明

::component-preview{name="checkbox-description"}
FieldContent 组织标签与帮助文字。
::

### 禁用

::component-preview{name="checkbox-disabled"}
disabled 阻止交互并弱化视觉。
::

### 复选组

::component-preview{name="checkbox-group"}
FieldSet 与 FieldGroup 组织多个独立选项。
::

### 表格

::component-preview{name="checkbox-table"}
每行复选框都有可访问名称。
::

### RTL

::component-preview{name="checkbox-rtl"}
阿拉伯语标签沿 RTL 内容流排列。
::

使用 v-model 控制 boolean 或 indeterminate；defaultValue 只适用于非受控初始值。Checkbox 使用 aria-invalid，外围 Field 使用 data-invalid，使视觉与辅助技术同步。disabled 由 Reka UI 阻止交互；Field 可用 data-disabled 同步标签样式。复选框状态与键盘行为不受文字方向影响，标签沿外围 dir 排列。

Checkbox 没有公开视觉变体；选中、未选、indeterminate、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `v-model` | `boolean \| 'indeterminate'` | `undefined` | 受控选中状态 |
| `defaultValue` | `boolean \| 'indeterminate'` | `false` | 非受控初始状态 |
| `disabled` | `boolean` | `false` | 禁止焦点与切换交互 |
| `required / name / value` | `CheckboxRootProps` | `undefined` | 由 Reka UI 透传的表单属性 |

## 无障碍

Checkbox 复用 Reka UI 的原生表单语义、Space 切换与状态属性。每个控件必须通过 FieldLabel、Label 或 aria-label 获得名称；无效状态同时设置 aria-invalid 和可读错误消息。
