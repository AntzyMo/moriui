import { describe, expect, it } from 'vite-plus/test'
import type { ComponentRecord } from '../app/documentation/registry'

import { resolveComponentRoute } from '../app/documentation/component-route'
import { getComponent } from '../app/documentation/registry'

function createDependencies(overrides: Partial<Record<string, ComponentRecord | undefined>> = {}) {
  const lookups: string[] = []

  return {
    lookups,
    dependencies: {
      getComponent(slug: string) {
        lookups.push(slug)
        return Object.hasOwn(overrides, slug) ? overrides[slug] : getComponent(slug)
      },
      createNotFound() {
        throw new Error('页面不存在')
      }
    }
  }
}

describe('组件详情路由决策', () => {
  it('Content 命中 Button 时渲染 Content，并查询注册表确认组件存在', () => {
    const { dependencies, lookups } = createDependencies()

    const decision = resolveComponentRoute({
      slug: 'button',
      contentPage: {
        body: {
          toc: {
            links: [{ id: '示例', text: '示例', depth: 2 }]
          }
        }
      },
      ...dependencies
    })

    expect(decision.kind).toBe('content')
    expect(decision.toc).toEqual([{ id: '示例', label: '示例' }])
    expect(lookups).toEqual(['button'])
  })

  it('无 Content 的已知组件触发 404，而不会回退到注册表详情', () => {
    const { dependencies, lookups } = createDependencies()

    expect(() => resolveComponentRoute({
      slug: 'input',
      contentPage: null,
      ...dependencies
    })).toThrow('页面不存在')
    expect(lookups).toEqual(['input'])
  })

  it('无 Content 的待发布 Tabs 触发 404', () => {
    const tabs = {
      ...getComponent('tabs')!,
      status: 'coming-soon' as const
    }
    const { dependencies, lookups } = createDependencies({ tabs })

    expect(() => resolveComponentRoute({
      slug: 'tabs',
      contentPage: null,
      ...dependencies
    })).toThrow('页面不存在')
    expect(lookups).toEqual(['tabs'])
  })

  it('未知 slug 触发 404', () => {
    const { dependencies, lookups } = createDependencies()

    expect(() => resolveComponentRoute({
      slug: 'not-real',
      contentPage: null,
      ...dependencies
    })).toThrow('页面不存在')
    expect(lookups).toEqual(['not-real'])
  })
})
