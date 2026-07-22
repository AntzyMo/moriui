---
title: Alert Dialog 确认对话
description: 用于确认对话场景的 MoriUI 组件。
---

# Alert Dialog 确认对话

用于确认对话场景的 MoriUI 组件。

## 导入

```ts
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from 'moriui'
```

## 示例

### 概览

确认操作的对话框。

::component-preview{name="alert-dialog-demo"}
::

### 基础

默认确认对话框。

::component-preview{name="alert-dialog-basic"}
::

### 破坏性

用于不可逆操作的确认。

::component-preview{name="alert-dialog-destructive"}
::

### 媒体

在对话框中展示图标或图片媒体。

::component-preview{name="alert-dialog-media"}
::

### 小尺寸

sm 尺寸适配紧凑场景。

::component-preview{name="alert-dialog-small"}
::

### 小尺寸媒体

小尺寸下的媒体布局。

::component-preview{name="alert-dialog-small-media"}
::

### RTL

在 RTL 页面中保持自然的操作顺序。

::component-preview{name="alert-dialog-rtl"}
::

## 使用说明

### 组合方式

AlertDialog 由 Trigger、Portal、Overlay、Content、Header、Media、Title、Description、Footer、Action 与 Cancel 组成。

### 尺寸

Content size 支持 default 与 sm，配合 Media 区域形成灵活布局。

### RTL

对话框内容沿外围 dir 排列，Action 与 Cancel 位置会随逻辑方向调整。

## 变体

AlertDialogContent size 支持 default 与 sm。

## 可访问性

AlertDialog 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 AlertDialogTitle，以及可选的 AlertDialogDescription 为屏幕阅读器提供上下文。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `AlertDialog v-model:open` | `boolean` | `undefined` | 对话框的受控打开状态。 |
| `AlertDialog defaultOpen` | `boolean` | `false` | 非受控对话框的初始状态。 |
| `AlertDialogContent size` | `'default' \| 'sm'` | `'default'` | 对话框尺寸。 |
| `AlertDialogContent class` | `HTMLAttributes["class"]` | `undefined` | 合并到对话框内容的调用方类。 |
| `AlertDialogHeader as / asChild` | `string \| Component / boolean` | `'div' / false` | 页眉的元素组合能力。 |
| `AlertDialogFooter as / asChild` | `string \| Component / boolean` | `'div' / false` | 页脚的元素组合能力。 |
| `AlertDialogMedia as / asChild` | `string \| Component / boolean` | `'div' / false` | 媒体区域的元素组合能力。 |
