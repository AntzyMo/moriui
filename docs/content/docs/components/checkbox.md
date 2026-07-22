---
title: Checkbox 多选框
description: 用于多选框场景的 MoriUI 组件。
---

# Checkbox 多选框

用于多选框场景的 MoriUI 组件。

## 导入

```ts
import { Checkbox } from 'moriui'
```

## 示例

### 概览

组合标签、说明、选中与禁用状态。

::component-preview{name="checkbox-demo"}
::

### 无效

同步 aria-invalid 与 Field data-invalid。

::component-preview{name="checkbox-invalid"}
::

### 基础

用 FieldLabel 建立明确标签关联。

::component-preview{name="checkbox-basic"}
::

### 说明

FieldContent 组织标签与帮助文字。

::component-preview{name="checkbox-description"}
::

### 禁用

disabled 阻止交互并弱化视觉。

::component-preview{name="checkbox-disabled"}
::

### 复选组

FieldSet 与 FieldGroup 组织多个独立选项。

::component-preview{name="checkbox-group"}
::

### 表格

每行复选框都有可访问名称。

::component-preview{name="checkbox-table"}
::

### RTL

阿拉伯语标签沿 RTL 内容流排列。

::component-preview{name="checkbox-rtl"}
::

## 使用说明

### 选中状态

使用 v-model 控制 boolean 或 indeterminate；defaultValue 只适用于非受控初始值。

### 无效状态

Checkbox 使用 aria-invalid，外围 Field 使用 data-invalid，使视觉与辅助技术同步。

### 禁用状态

disabled 由 Reka UI 阻止交互；Field 可用 data-disabled 同步标签样式。

### RTL

复选框状态与键盘行为不受文字方向影响，标签沿外围 dir 排列。

## 变体

Checkbox 没有公开视觉变体；选中、未选、indeterminate、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。

## 可访问性

Checkbox 复用 Reka UI 的原生表单语义、Space 切换与状态属性。每个控件必须通过 FieldLabel、Label 或 aria-label 获得名称；无效状态同时设置 aria-invalid 和可读错误消息。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `boolean \| 'indeterminate'` | `undefined` | 受控选中状态。 |
| `defaultValue` | `boolean \| 'indeterminate'` | `false` | 非受控初始状态。 |
| `disabled` | `boolean` | `false` | 禁止焦点与切换交互。 |
| `required / name / value` | `CheckboxRootProps` | `undefined` | 由 Reka UI 透传的表单属性。 |
