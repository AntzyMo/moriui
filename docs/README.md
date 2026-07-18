# MoriUI 文档站

MoriUI 文档站基于 Nuxt Content 构建，使用工作区中的 `moriui` 组件和默认主题。站点在构建阶段预渲染为静态 HTML，不需要运行时 SSR 服务。

## 环境准备

在 `moriui` 仓库根目录安装工作区依赖：

```bash
pnpm install
```

文档会通过 `moriui/style.css` 消费核心包的已发布样式入口。因此首次开发、清理依赖后或修改核心样式后，先构建核心包：

```bash
pnpm --dir packages/core run build
```

## 本地开发

启动文档开发服务器：

```bash
pnpm --dir docs dev
```

## 质量检查

运行文档的单元测试和类型检查：

```bash
pnpm --dir docs test
pnpm --dir docs run typecheck
```

### 文档布局人工检查

- 在桌面宽度确认顶部导航、首页展台和三栏正文均位于同一居中轴，左右栏不贴浏览器边缘。
- 在中屏确认右侧目录隐藏；在小屏确认「导航」打开 MoriUI Sheet。
- 用键盘打开 Command、Dialog 和 Sheet，确认焦点进入、Escape 关闭与可见焦点环。
- 切换 `data-theme="light"` 与 `data-theme="dark"`，确认没有蓝色主操作、彩虹点位或密集分割线。

## 静态预渲染

文档的 `build` 命令等同于 `nuxt generate`：它会在构建期生成所有已登记路由的 HTML，而不是启动 SSR 运行时。

```bash
pnpm --dir packages/core run build
pnpm rebuild better-sqlite3
pnpm --dir docs run build
```

在部分本机环境中，`better-sqlite3` 的原生绑定可能未被包管理器构建，构建时会出现 `Could not locate the bindings file`。此时先运行上面的 `pnpm rebuild better-sqlite3`，再重新执行静态构建。若依然缺少当前 Node.js 版本的绑定，在已安装 Xcode Command Line Tools 的前提下，可在该依赖目录执行其原生构建脚本：

```bash
cd node_modules/.pnpm/better-sqlite3@*/node_modules/better-sqlite3
npm run build-release
```

构建完成后回到仓库根目录，重新运行 `pnpm --dir docs run build`。

预渲染完成后，将 `docs/.output/public` 作为静态目录部署到任意静态托管服务。该目录包含首页、基础文档、组件页和 404 页面，不需要 Node.js 或 Nuxt SSR 服务器。

可选地在本机预览已生成站点：

```bash
pnpm --dir docs preview
```
