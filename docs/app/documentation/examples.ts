import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

interface VueModule {
  default: Component
}

export interface ResolvedDocumentationExample {
  code: string
  preview: Component
}

type ExampleLoaders = Record<string, () => Promise<VueModule>>
type ExampleSources = Record<string, string>

const exampleLoaders = import.meta.glob<VueModule>('../components/examples/*/*.vue')
const exampleSources = import.meta.glob('../components/examples/*/*.vue', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as ExampleSources

export function resolveDocumentationExampleEntries(
  name: string,
  loaders: ExampleLoaders,
  sources: ExampleSources
): ResolvedDocumentationExample {
  const paths = Object.keys(loaders).filter(path => path.endsWith(`/${name}.vue`))
  if (paths.length !== 1) {
    throw new Error(
      `[MoriUI 文档] 示例「${name}」必须唯一；候选路径：${paths.join('、') || '无'}`
    )
  }

  const path = paths[0]!
  const source = sources[path]
  if (!source?.trim())
    throw new Error(`[MoriUI 文档] 示例「${name}」缺少源码：${path}`)

  return {
    code: source,
    preview: defineAsyncComponent(async () => (await loaders[path]!()).default)
  }
}

export function resolveDocumentationExample(name: string) {
  return resolveDocumentationExampleEntries(name, exampleLoaders, exampleSources)
}

export function resolveDocumentationExampleAtPath(path: string): ResolvedDocumentationExample {
  const name = path.split('/').at(-1)?.replace(/\.vue$/, '')
  if (!name)
    throw new Error(`[MoriUI 文档] 非法示例路径：${path}`)

  const loader = exampleLoaders[path]
  const source = exampleSources[path]
  if (!loader || !source?.trim())
    throw new Error(`[MoriUI 文档] 找不到示例：${path}`)

  return {
    code: source,
    preview: defineAsyncComponent(async () => (await loader()).default)
  }
}
