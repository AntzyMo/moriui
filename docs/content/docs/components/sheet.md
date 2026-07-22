---
title: Sheet 侧边面板
description: 用于侧边面板场景的 MoriUI 组件。
---

# Sheet 侧边面板

用于侧边面板场景的 MoriUI 组件。

## 导入

```ts
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger } from 'moriui'
```

## 示例

### 概览

编辑资料的侧边面板。

::component-preview{name="sheet-demo"}
::

### 位置

使用 side 控制面板从屏幕边缘滑出。

::component-preview{name="sheet-side"}
::

### 无关闭按钮

隐藏默认关闭按钮。

::component-preview{name="sheet-no-close-button"}
::

### RTL

从右到左的面板布局。

::component-preview{name="sheet-rtl"}
::

## 使用说明

### 组合方式

Sheet 由 Trigger 和 Content 组成；Content 内可使用 Header、Title、Description 与 Footer 组织结构。

### 位置

side 控制面板从屏幕边缘滑出的方向，支持 top、right、bottom、left。

### 无关闭按钮

showCloseButton 控制默认关闭控件的显示。

### RTL

方向由 DirectionProvider 控制。

## 变体

SheetContent 的 side 支持 top、right、bottom、left。

## 可访问性

Sheet 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 SheetTitle，并在需要时提供 SheetDescription。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Sheet v-model:open` | `boolean` | `undefined` | 面板的受控打开状态。 |
| `Sheet defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `SheetContent side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | 面板从屏幕边缘滑出的方向。 |
| `SheetContent showCloseButton` | `boolean` | `true` | 是否显示默认关闭按钮。 |
| `SheetClose as / asChild` | `string \| Component / boolean` | `'button' / false` | 关闭触发器的元素组合能力。 |
| `SheetHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到面板头部的调用方类。 |
| `SheetFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到面板脚部的调用方类。 |
