---
title: Textarea 多行输入
description: 用于多行输入场景的 MoriUI 组件。
---

# Textarea 多行输入

用于多行输入场景的 MoriUI 组件。

## 导入

```ts
import { Textarea } from 'moriui'
```

## 示例

### 概览

通过 v-model 编辑多行消息。

::component-preview{name="textarea-demo"}
::

### 字段

Field 组合标签、说明与多行输入。

::component-preview{name="textarea-field"}
::

### 禁用

disabled 阻止编辑并保留当前内容。

::component-preview{name="textarea-disabled"}
::

### 无效

aria-invalid 与 FieldError 提供完整错误反馈。

::component-preview{name="textarea-invalid"}
::

### 操作按钮

多行输入与发送按钮组成消息编辑区。

::component-preview{name="textarea-button"}
::

### RTL

阿拉伯语反馈输入使用 RTL 文本方向。

::component-preview{name="textarea-rtl"}
::

## 使用说明

### 基础输入

Textarea 渲染原生 textarea，并通过字符串 v-model 同步多行内容。

### 字段组合

使用 FieldLabel、FieldDescription 与 FieldError 提供名称、帮助和校验反馈。

### 禁用与无效

disabled 保留原生禁用语义；aria-invalid 与外围 Field 的 data-invalid 同步错误状态。

### RTL

textarea 的文字、占位符和光标方向可继承或显式设置 dir。

## 变体

Textarea 没有公开视觉或尺寸变体；通过 rows、disabled、required、aria-invalid 等原生属性描述具体场景。

## 可访问性

Textarea 输出原生 textarea，必须使用 FieldLabel/Label 或 aria-label 提供名称。错误使用 aria-invalid 和 FieldError，必填使用 required；不要用 placeholder 替代持久可见的标签。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Textarea v-model` | `string` | `''` | 当前多行文本值。 |
| `Textarea defaultValue` | `string` | `undefined` | 未提供 v-model 时的初始值。 |
| `原生 textarea 属性` | `TextareaHTMLAttributes` | `—` | rows、disabled、required、placeholder、maxlength、aria-invalid 等自动透传。 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 合并到 Textarea 的 Nova 基础样式。 |
