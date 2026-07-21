---
title: Direction 方向容器
description: 管理子树书写方向的容器。
group: 基础
related:
  - typography
---

## 引入

```vue
import { DirectionProvider, useDirection } from 'moriui'
```

## 示例

### RTL 卡片

::component-preview{name="card-rtl"}
DirectionProvider 为子树提供从右到左的方向上下文。
::

useDirection 读取最近 DirectionProvider 或 Reka 配置中的 ltr/rtl 值，供需要方向感知的组合逻辑使用。

DirectionProvider 没有视觉变体，只提供 ltr 与 rtl 两种方向上下文。

## API 参考

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `direction` | `'ltr' \| 'rtl'` | `'ltr'` | 推荐的子树书写方向属性 |
| `dir` | `'ltr' \| 'rtl'` | `undefined` | direction 未传入时使用的兼容属性 |
| `useDirection()` | `ComputedRef<'ltr' \| 'rtl'>` | `—` | 读取当前 Reka 方向上下文 |

## 无障碍

方向上下文应与内容语言一致；页面根元素仍应设置正确的 lang 和 dir，避免视觉顺序与屏幕阅读器阅读顺序不一致。
