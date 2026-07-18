---
title: 主题
description: 使用 html[data-theme] 切换 Nova 的浅色与深色模式。
---

# 主题

MoriUI 的主题状态只写在根元素的 `data-theme` 属性上。组件读取同一组语义 Token，因此业务页面无需为浅色和深色分别维护样式分支。

## 主题入口

浅色模式使用：

```html
<html data-theme="light">
```

深色模式使用：

```html
<html data-theme="dark">
```

不要同时维护额外的 `.dark` 选择器；一个明确的根属性更容易被服务端渲染、持久化逻辑和自动化测试共同识别。

## 切换模式

主题切换只需要更新 `document.documentElement.dataset.theme`。在 Nuxt 中，建议用客户端安全的组合式函数保存选择，并在首次渲染前恢复它，避免页面闪烁。

## 保持一致

页面布局优先使用 `bg-background`、`text-foreground`、`bg-muted` 与 `text-muted-foreground` 等语义工具类。不要在局部组件重新声明主题变量；这样新增组件时会自然继承当前模式。
