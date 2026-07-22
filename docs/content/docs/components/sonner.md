---
title: Sonner 轻量通知
description: 用于轻量通知场景的 MoriUI 组件。
---

# Sonner 轻量通知

用于轻量通知场景的 MoriUI 组件。

## 导入

```ts
import { Sonner, toast } from 'moriui'
```

## 示例

### 概览

触发 toast 通知。

::component-preview{name="sonner-demo"}
::

### 类型

不同风格的通知。

::component-preview{name="sonner-types"}
::

### 描述

带描述和操作的通知。

::component-preview{name="sonner-description"}
::

### 位置

通知出现位置。

::component-preview{name="sonner-position"}
::

## 使用说明

### 使用方式

安装 Sonner 到应用根节点，通过 toast API 触发通知。

### 类型

toast API 支持 default/success/error/info/warning 类型。

### 位置

position 控制通知的出现位置（如 top-right、bottom-center）。

### RTL

通知内容沿 dir 排列。

## 变体

Sonner 的 position 支持 top-left/top-center/top-right/bottom-left/bottom-center/bottom-right。

## 可访问性

Sonner 使用 role="status" 和 aria-live="polite" 确保通知被屏幕阅读器朗读。可交互的通知应包含操作按钮。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Sonner position` | `SonnerPosition` | `'bottom-right'` | 通知出现位置。 |
| `Sonner duration` | `number` | `4000` | 通知显示的毫秒数。 |
| `Sonner closeButton` | `boolean` | `false` | 是否显示关闭按钮。 |
| `Sonner richColors` | `boolean` | `false` | 是否使用丰富的颜色方案。 |
| `toast()` | `(message: string) => string` | `—` | 触发默认通知。 |
| `toast.success()` | `(message: string) => string` | `—` | 触发成功通知。 |
| `toast.error()` | `(message: string) => string` | `—` | 触发错误通知。 |
| `toast.info()` | `(message: string) => string` | `—` | 触发信息通知。 |
| `toast.warning()` | `(message: string) => string` | `—` | 触发警告通知。 |
