---
title: Resizable 可调尺寸
description: 用于可调尺寸场景的 MoriUI 组件。
---

# Resizable 可调尺寸

用于可调尺寸场景的 MoriUI 组件。

## 导入

```ts
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'moriui'
```

## 示例

### 概览

水平排列三个面板。

::component-preview{name="resizable-demo"}
::

### 垂直

垂直排列面板。

::component-preview{name="resizable-vertical"}
::

### 手柄

自定义拖拽手柄图标。

::component-preview{name="resizable-handle"}
::

### RTL

从右到左的面板布局。

::component-preview{name="resizable-rtl"}
::

## 使用说明

### 组合方式

Resizable 基于 PanelGroup 组合 Panel 和 Handle，支持水平和垂直方向。

### 垂直方向

direction="vertical" 切换上下排列。

### 自定义手柄

ResizableHandle 默认插槽可放置自定义拖拽图标。

### RTL

PanelGroup 在 RTL 中翻转逻辑方向。

## 变体

ResizablePanelGroup 的 direction 支持 horizontal/vertical；ResizableHandle 显示拖拽区域。

## 可访问性

Resizable 通过 PanelGroup 的 role="region" 和 aria-label 提供语义。Handle 使用 role="separator" 和 aria-valuenow，键盘用户可使用方向键调整尺寸。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `ResizablePanelGroup direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 面板排列方向。 |
| `ResizablePanelGroup autoSaveId` | `string` | `undefined` | 自动保存面板尺寸的存储键。 |
| `ResizablePanel defaultSize` | `number` | `undefined` | 面板初始大小百分比。 |
| `ResizablePanel minSize` | `number` | `undefined` | 面板最小百分比。 |
| `ResizablePanel maxSize` | `number` | `undefined` | 面板最大百分比。 |
| `ResizablePanel collapsible` | `boolean` | `false` | 面板可折叠。 |
| `ResizablePanel collapsedSize` | `number` | `undefined` | 折叠后的大小百分比。 |
| `ResizableHandle class` | `HTMLAttributes["class"]` | `undefined` | 合并到拖拽手柄的调用方类。 |
