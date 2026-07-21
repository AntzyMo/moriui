---
title: Attachment 文件附件
description: 展示文件元数据和操作附件的组件。
group: 表单
related: []
---

## 引入

```vue
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from 'moriui'
```

## 示例

### 概览

::component-preview{name="attachment-demo"}
展示文件媒体、元数据与移除操作。
::

### 图片

::component-preview{name="attachment-image"}
图片媒体使用 image 变体与竖向布局。
::

### 上传状态

::component-preview{name="attachment-states"}
用明确文字和图标表达上传生命周期。
::

### 尺寸

::component-preview{name="attachment-sizes"}
default、sm 与 xs 适配不同信息密度。
::

### 附件组

::component-preview{name="attachment-group"}
横向滚动并吸附多个附件。
::

### 整卡触发器

::component-preview{name="attachment-trigger"}
AttachmentTrigger 提供覆盖整卡的独立操作入口。
::

Attachment 以 Media、Content、Actions 与可选 Trigger 组合文件元数据和操作；AttachmentGroup 负责横向附件集合。state 支持 idle、uploading、processing、error 与 done；错误说明需要保留文字，不能只依赖颜色。AttachmentAction 与覆盖整卡的 AttachmentTrigger 都是独立可聚焦目标；仅图标操作必须提供 aria-label。

Attachment 的 state 支持 idle/uploading/processing/error/done，size 支持 default/sm/xs，orientation 支持 horizontal/vertical；AttachmentMedia variant 支持 icon/image。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `Attachment state` | `'idle' \| 'uploading' \| 'processing' \| 'error' \| 'done'` | `'done'` | 上传生命周期与对应视觉状态 |
| `Attachment size` | `'default' \| 'sm' \| 'xs'` | `'default'` | 附件密度尺寸 |
| `Attachment orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 媒体与内容的排列方向 |
| `AttachmentMedia variant` | `'icon' \| 'image'` | `'icon'` | 图标或图片媒体样式 |
| `AttachmentAction variant / size` | `ButtonVariants` | `'ghost' / 'icon-xs'` | 基于 MoriUI Button 的附件操作样式 |
| `AttachmentTrigger as / asChild` | `string \| Component / boolean` | `'button' / false` | 整卡触发器的语义元素组合能力 |
| `class` | `HTMLAttributes["class"]` | `undefined` | 各可见槽位均合并调用方类 |

## 无障碍

附件标题与说明应包含可理解的文件名、类型、大小和失败原因。仅图标 AttachmentAction 与无文本 AttachmentTrigger 必须提供 aria-label；可滚动的纯展示 AttachmentGroup 应提供可访问名称与键盘滚动入口。
