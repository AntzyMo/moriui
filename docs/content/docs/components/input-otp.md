---
title: Input OTP 验证码输入
description: 用于验证码输入场景的 MoriUI 组件。
---

# Input OTP 验证码输入

用于验证码输入场景的 MoriUI 组件。

## 导入

```ts
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from 'moriui'
```

## 示例

### 概览

六位数字验证码。

::component-preview{name="input-otp-demo"}
::

### 仅数字

type="number" 过滤非数字输入。

::component-preview{name="input-otp-pattern"}
::

### 分隔符

Group 与 Separator 将验证码分段。

::component-preview{name="input-otp-separator"}
::

### 禁用

disabled 阻止所有验证码格交互。

::component-preview{name="input-otp-disabled"}
::

### 受控

数组 v-model 实时展示当前值。

::component-preview{name="input-otp-controlled"}
::

### 无效

每个 Slot 使用 aria-invalid。

::component-preview{name="input-otp-invalid"}
::

### 四位 PIN

四个索引组成常见 PIN 输入。

::component-preview{name="input-otp-four-digits"}
::

### 字母数字

type="text" 接受字母与数字。

::component-preview{name="input-otp-alphanumeric"}
::

### 表单

验证卡片组合标签、重发与提交操作。

::component-preview{name="input-otp-form"}
::

### RTL

验证码在 RTL 方向中保持正确键盘顺序。

::component-preview{name="input-otp-rtl"}
::

## 使用说明

### 组合方式

InputOTP 基于 Reka PinInput，按索引组合 Slot，并可用 Group 与 Separator 建立视觉分段。

### 输入类型

MoriUI 使用 type="number" 限制数字，使用 type="text" 接受字母数字；不公开 input-otp 的 pattern/maxLength 字符串 API。

### 受控状态

v-model 是 string[] 或 number[]；每个 InputOTPSlot 的 index 决定对应数组位置。

### 无效与禁用

disabled 设置在 InputOTP 根；无效样式和辅助技术状态设置在各 InputOTPSlot 的 aria-invalid。

### RTL

dir 由 Reka UI 用于左右方向键顺序和输入组阅读方向。

## 变体

InputOTP 无公开视觉变体；type 支持 text/number，otp 默认为 true，Slot 数量由调用方组合决定。

## 可访问性

InputOTP 复用 Reka PinInput 的粘贴分发、自动前进、退格、方向键与隐藏表单输入。根组件需要标签或 aria-label；禁用设置在根，无效状态设置在对应 Slot，并提供可读错误说明。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `InputOTP v-model` | `string[] \| number[]` | `[]` | 按 Slot index 排列的验证码值。 |
| `InputOTP type` | `'text' \| 'number'` | `'text'` | 文本或数字输入模式，并决定 v-model 数组类型。 |
| `InputOTP otp` | `boolean` | `true` | 启用一次性验证码自动填充与顺序输入。 |
| `InputOTP disabled / required` | `boolean` | `false` | 整体禁用与表单必填语义。 |
| `InputOTP mask` | `boolean` | `false` | 以密码形式隐藏每格内容。 |
| `InputOTP @complete` | `(value: string[] \| number[]) => void` | `—` | 所有已渲染 Slot 填满时触发。 |
| `InputOTPSlot index` | `number` | `—` | 必填的数组位置。 |
