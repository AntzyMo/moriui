import type { Direction } from 'reka-ui'

import { useDirection } from '../src/components/direction'
import DirectionProvider from '../src/components/direction/DirectionProvider.vue'

import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

afterEach(cleanup)

const DirectionConsumer = defineComponent({
  setup() {
    const direction = useDirection()

    return () => h('output', {
      'data-direction': direction.value
    }, direction.value)
  }
})

it('默认提供 ltr 方向，且不渲染额外 DOM 节点', () => {
  const Fixture = defineComponent({
    setup: () => () => h(DirectionProvider, {}, {
      default: () => h(DirectionConsumer)
    })
  })
  const page = render(Fixture)
  const consumer = page.container.querySelector('output') as HTMLOutputElement

  expect(page.container.children).toHaveLength(1)
  expect(page.container.firstElementChild).toBe(consumer)
  expect(consumer.dataset.direction).toBe('ltr')
  expect(consumer.textContent).toBe('ltr')
  expect(consumer.hasAttribute('dir')).toBe(false)
})

it('dir 会提供给任意后代，嵌套 Provider 以最近一层为准', () => {
  const Fixture = defineComponent({
    setup: () => () => h(DirectionProvider, { dir: 'ltr' }, {
      default: () => h(DirectionProvider, { dir: 'rtl' }, {
        default: () => h(DirectionConsumer)
      })
    })
  })
  const page = render(Fixture)
  const consumer = page.container.querySelector('output') as HTMLOutputElement

  expect(consumer.dataset.direction).toBe('rtl')
})

it('direction 别名优先于 dir，并在更新后同步给后代', async () => {
  const dir = shallowRef<Direction>('ltr')
  const direction = shallowRef<Direction>('rtl')
  const Fixture = defineComponent({
    setup: () => () => h(DirectionProvider, {
      dir: dir.value,
      direction: direction.value
    }, {
      default: () => h(DirectionConsumer)
    })
  })
  const page = render(Fixture)
  const consumer = page.container.querySelector('output') as HTMLOutputElement

  expect(consumer.dataset.direction).toBe('rtl')

  direction.value = 'ltr'
  await nextTick()
  expect(consumer.dataset.direction).toBe('ltr')

  dir.value = 'rtl'
  await nextTick()
  expect(consumer.dataset.direction).toBe('ltr')
})
