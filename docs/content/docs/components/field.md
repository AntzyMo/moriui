---
title: Field 表单字段
description: 用于表单字段场景的 MoriUI 组件。
---

# Field 表单字段

用于表单字段场景的 MoriUI 组件。

## 导入

```ts
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from 'moriui'
```

## 示例

### 概览

组合字段组、字段集、分隔线与操作。

::component-preview{name="field-demo"}
::

### 输入框

标签、输入和说明的基础字段。

::component-preview{name="field-input"}
::

### 多行输入

Textarea 与帮助文字组成反馈字段。

::component-preview{name="field-textarea"}
::

### 选择框

MoriUI Select 可复用 Field 的标签、说明与布局。

::component-preview{name="field-select"}
::

### 滑块

标题与说明展示当前范围值。

::component-preview{name="field-slider"}
::

### 字段集

FieldSet 与 Legend 建立语义分组。

::component-preview{name="field-fieldset"}
::

### 复选框

多个复选字段共享说明和图例。

::component-preview{name="field-checkbox"}
::

### 单选

RadioGroup 与多个 RadioGroupItem 共享 Field 布局。

::component-preview{name="field-radio"}
::

### 开关

横向 Field 对齐标签与 Switch。

::component-preview{name="field-switch"}
::

### 选择卡片

FieldLabel 包裹完整选择卡片。

::component-preview{name="field-choice-card"}
::

### 字段组

FieldSeparator 分隔通知类别。

::component-preview{name="field-group"}
::

### RTL

字段结构继承 RTL 文本方向。

::component-preview{name="field-rtl"}
::

### 响应式

responsive 在容器中调整标签与控件布局。

::component-preview{name="field-responsive"}
::

## 使用说明

### 组合方式

单个 Field 组合 Label、控件、Description 与 Error；相关控件由 FieldGroup 和语义 FieldSet 组织。

### 结构

FieldContent 用于横向布局中的标题与说明；没有说明时不需要额外包装。

### 响应式布局

orientation 支持 vertical、horizontal、responsive；responsive 通过组件样式在合适容器宽度切换。

### 校验与错误

Field 使用 data-invalid，真实控件使用 aria-invalid，FieldError 以 role="alert" 输出去重后的错误。

## 变体

Field orientation 支持 vertical、horizontal、responsive；FieldLegend variant 支持 legend、label。

## 可访问性

FieldSet 与 FieldLegend 提供原生字段集语义，Field 输出 role="group"，FieldError 输出 role="alert"。Label 的 for 必须指向控件 id；无效控件同时使用 aria-invalid 与可读错误消息。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Field orientation` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | 标签、控件和说明的布局方向。 |
| `FieldLegend variant` | `'legend' \| 'label'` | `'legend'` | 语义图例的视觉层级。 |
| `FieldError errors` | `Array<string \| { message?: string } \| null \| undefined>` | `[]` | 去重并渲染一个或多个错误消息。 |
| `FieldLabel` | `LabelProps` | `—` | 完整透传 MoriUI Label 属性。 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 所有 Field 子组件均合并调用方类。 |
