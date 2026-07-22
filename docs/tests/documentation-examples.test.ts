import type { Component } from 'vue'
import { describe, expect, it } from 'vite-plus/test'
import {
  resolveDocumentationExample,
  resolveDocumentationExampleEntries
} from '../app/documentation/examples'

const loader = async () => ({ default: {} as Component })

describe('文档示例解析', () => {
  it('按全局唯一名称解析 Button 示例及源码', () => {
    const example = resolveDocumentationExample('button-demo')

    expect(example.code).toContain('<template>')
    expect(example.preview).toBeTruthy()
  })

  it('名称不存在时给出名称和候选路径', () => {
    expect(() => resolveDocumentationExample('not-real')).toThrow('not-real')
    expect(() => resolveDocumentationExample('not-real')).toThrow('候选路径：无')
  })

  it('名称重名时拒绝猜测路径', () => {
    expect(() => resolveDocumentationExampleEntries('demo', {
      '../components/examples/alpha/demo.vue': loader,
      '../components/examples/beta/demo.vue': loader
    }, {
      '../components/examples/alpha/demo.vue': '<template><div /></template>',
      '../components/examples/beta/demo.vue': '<template><div /></template>'
    })).toThrow('候选路径：../components/examples/alpha/demo.vue、../components/examples/beta/demo.vue')
  })
})
