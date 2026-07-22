---
title: Switch 状态开关
description: 用于状态开关场景的 MoriUI 组件。
---

# Switch 状态开关

用于状态开关场景的 MoriUI 组件。

## 导入

```ts
import { Switch } from 'moriui'
```

## 示例

### 概览

开关与标签通过 id/for 关联。

::component-preview{name="switch-demo"}
::

### 说明

横向 Field 对齐说明文字与状态开关。

::component-preview{name="switch-description"}
::

### 选择卡片

整行标签提供更大的可点击区域。

::component-preview{name="switch-choice-card"}
::

### 禁用

disabled 阻止切换并同步 Field 视觉。

::component-preview{name="switch-disabled"}
::

### 无效

aria-invalid 与文字说明表达必选要求。

::component-preview{name="switch-invalid"}
::

### 尺寸

sm 与 default 适配不同密度。

::component-preview{name="switch-sizes"}
::

### RTL

阿拉伯语标签在 RTL 横向布局中工作。

::component-preview{name="switch-rtl"}
::

## 使用说明

### 开关状态

Switch 使用 v-model 持有 boolean 或自定义 trueValue/falseValue，checked/unchecked 状态由 Reka UI 输出。

### 说明与选择卡片

FieldContent 组合标签和说明；FieldLabel 可包裹整行以扩大开关的可点击区域。

### 禁用与无效

disabled 阻止切换；aria-invalid 与外围 Field 的 data-invalid 同步校验状态。

### 尺寸

size 支持 sm 与 default，两者保持相同的键盘和表单行为。

### RTL

开关状态不依赖书写方向，标签与说明沿 Field 的 dir 排列。

## 变体

Switch 的 size 支持 sm/default；checked、unchecked、disabled 与 invalid 由 Reka 状态和 ARIA 属性驱动。

## 可访问性

Switch 复用 Reka UI 的 role="switch"、aria-checked、Space/Enter 切换与隐藏表单输入。必须关联 FieldLabel/Label 或提供 aria-label；禁用使用 disabled，无效使用 aria-invalid 和可读说明。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Switch v-model` | `T \| null` | `falseValue` | 当前开关值。 |
| `Switch defaultValue` | `T` | `falseValue` | 非受控初始值。 |
| `Switch trueValue / falseValue` | `T` | `true / false` | 开启与关闭状态对应的模型值。 |
| `Switch size` | `'sm' \| 'default'` | `'default'` | 开关尺寸。 |
| `Switch disabled / required` | `boolean` | `false` | 禁用交互与表单必填语义。 |
| `Switch name / value` | `string` | `undefined / 'on'` | 隐藏表单控件的名称与提交值。 |
| `Switch as / asChild` | `string \| Component / boolean` | `'button' / false` | 元素组合能力；默认保留 button 与 switch 语义。 |
