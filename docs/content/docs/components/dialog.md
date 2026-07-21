---
title: Dialog 模态窗口
description: 在浮层中展示聚焦任务或信息的模态窗口。
group: 浮层
related:
  - alert-dialog
  - drawer
---

## 引入

```vue
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from 'moriui'
```

## 示例

### 概览

::component-preview{name="dialog-demo"}
在不中断当前上下文的情况下展示聚焦任务。
::

### 自定义关闭按钮

::component-preview{name="dialog-close-button"}
使用 DialogClose 替换默认关闭控件。
::

### 无关闭按钮

::component-preview{name="dialog-no-close-button"}
隐藏默认关闭按钮。
::

### 固定底部

::component-preview{name="dialog-sticky-footer"}
操作栏固定在底部。
::

### 可滚动内容

::component-preview{name="dialog-scrollable-content"}
长内容在固定头部下方滚动。
::

### RTL

::component-preview{name="dialog-rtl"}
从右到左的对话框内容。
::

使用 Dialog、DialogTrigger 和 DialogContent 组织模态窗口；内容内可使用 Header、Title、Description 与 Footer 提供清晰结构。DialogClose 提供自定义关闭触发器，可用于替换默认关闭控件。showCloseButton 控制默认关闭控件的显示与隐藏。DialogFooter 固定在底部，内容区域独立滚动，操作始终可见。长内容在固定 Header 下方滚动，适合条款等长文本。对话框继承外围书写方向，内容随 dir 调整。

DialogContent 提供统一模态表面；用 Header、Title、Description 与 Footer 组织语义结构。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Dialog v-model:open` | `boolean` | `undefined` | 对话框的受控打开状态 |
| `Dialog defaultOpen` | `boolean` | `false` | 非受控对话框的初始状态 |
| `Dialog modal` | `boolean` | `true` | 是否阻断背景区域交互 |
| `DialogContent showCloseButton` | `boolean` | `true` | 是否显示默认关闭按钮 |
| `DialogClose as / asChild` | `string \| Component / boolean` | `'button' / false` | 关闭触发器的元素组合能力 |
| `DialogHeader class` | `HTMLAttributes["class"]` | `undefined` | 合并到对话框头部的调用方类 |
| `DialogFooter class` | `HTMLAttributes["class"]` | `undefined` | 合并到对话框脚部的调用方类 |

## 无障碍

Dialog 复用 Reka UI 的焦点管理、Escape 关闭、遮罩交互和触发器焦点归还。DialogContent 内应提供 DialogTitle，并在需要补充说明时提供 DialogDescription。
