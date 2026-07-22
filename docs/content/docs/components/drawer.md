---
title: Drawer 抽屉面板
description: 用于抽屉面板场景的 MoriUI 组件。
---

# Drawer 抽屉面板

用于抽屉面板场景的 MoriUI 组件。

## 导入

```ts
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHandle, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from 'moriui'
```

## 示例

### 概览

从底部滑出的编辑面板。

::component-preview{name="drawer-demo"}
::

### 方向

从各侧滑入。

::component-preview{name="drawer-sides"}
::

### 吸附点

snapPoints 控制多级高度位置。

::component-preview{name="drawer-snap-points"}
::

### 拖拽手柄

手柄区域触发拖拽交互。

::component-preview{name="drawer-swipe-handle"}
::

### 非模态

非模态时背景可交互。

::component-preview{name="drawer-non-modal"}
::

### 嵌套

在 Drawer 内打开另一个 Drawer。

::component-preview{name="drawer-nested"}
::

### 对话框

结合 Dialog 与 Drawer 的响应式模式。

::component-preview{name="drawer-dialog"}
::

### RTL

在 RTL 页面中保持自然的方向逻辑。

::component-preview{name="drawer-rtl"}
::

## 使用说明

### 组合方式

Drawer 由 Trigger、Portal、Overlay、Content 与 Handle 组成；Content 内可使用 Header、Title、Description 与 Footer 组织结构。

### 吸附点

snapPoints 设置内容停靠位置；activeSnapPoint 控制当前吸附点，用户拖拽时自动捕捉。

### 拖拽手柄

showHandle 控制交互手柄的显示；DrawerHandle 也可独立使用 Reka Drawer 原语的拖拽行为。

### 从各侧滑出

direction 控制抽屉从屏幕的哪一侧滑入，支持 top、right、bottom、left。

### 非模态

modal 控制是否阻止背景交互；非模态时用户可与背景内容交互。

### RTL

direction 的左右逻辑在 RTL 上下文中自然翻转。

## 变体

Drawer 的 direction 支持 top、right、bottom、left；snapPoints 通过 number[] 定义吸附位置百分比。

## 可访问性

Drawer 复用 Reka UI Dialog 的焦点管理、Escape 关闭、遮罩交互和焦点归还。Content 内应提供 DrawerTitle，需要时提供 DrawerDescription。拖拽交互在触摸设备上需确保有键盘替代方式。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Drawer v-model:open` | `boolean` | `undefined` | 抽屉的受控打开状态。 |
| `Drawer defaultOpen` | `boolean` | `false` | 非受控初始打开状态。 |
| `Drawer direction` | `'top' \| 'right' \| 'bottom' \| 'left'` | `undefined` | 抽屉从屏幕边缘滑出的方向。 |
| `Drawer modal` | `boolean` | `true` | 是否阻断背景区域交互。 |
| `Drawer dismissible` | `boolean` | `true` | 是否点击遮罩或拖拽关闭。 |
| `Drawer snapPoints` | `number[]` | `undefined` | 可吸附的高度百分比位置。 |
| `DrawerContent showHandle` | `boolean` | `false` | 是否显示拖拽手柄。 |
| `DrawerHandle class` | `HTMLAttributes["class"]` | `undefined` | 合并到手柄的调用方类。 |
| `DrawerHeader as / asChild` | `string \| Component / boolean` | `'div' / false` | 页眉的元素组合能力。 |
| `DrawerFooter as / asChild` | `string \| Component / boolean` | `'div' / false` | 页脚的元素组合能力。 |
| `DrawerClose as / asChild` | `string \| Component / boolean` | `undefined` | 关闭按钮的元素组合能力。 |
