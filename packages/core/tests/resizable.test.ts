import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import ResizablePanel from '../src/components/resizable/ResizablePanel.vue'
import ResizableHandle from '../src/components/resizable/ResizableHandle.vue'
import ResizablePanelGroup from '../src/components/resizable/ResizablePanelGroup.vue'

import './style.css'

function createFixture(options: {
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
  withHandle?: boolean
} = {}) {
  const layout = vi.fn()
  const panel = shallowRef<InstanceType<typeof ResizablePanel>>()
  const Fixture = defineComponent({
    setup: () => () => h(ResizablePanelGroup, {
      'class': 'custom-resizable',
      'data-testid': 'resizable-group',
      'direction': options.direction ?? 'horizontal',
      'onLayout': layout,
      'style': 'height: 240px; width: 480px;'
    }, {
      default: () => [
        h(ResizablePanel, {
          ref: panel,
          class: 'custom-panel',
          collapsible: true,
          collapsedSize: 10,
          defaultSize: 30,
          minSize: 20
        }, {
          default: ({ isCollapsed, resize }) => h('button', {
            'data-testid': 'panel-action',
            'onClick': () => resize(40)
          }, isCollapsed ? '已折叠' : '已展开')
        }),
        h(ResizableHandle, {
          class: 'custom-handle',
          disabled: options.disabled,
          withHandle: options.withHandle
        }),
        h(ResizablePanel, { defaultSize: 70 }, { default: () => '内容' })
      ]
    })
  })

  return { layout, page: render(Fixture), panel }
}

it('渲染稳定槽位、透传属性和 Reka 作用域插槽', async () => {
  const { page } = createFixture({ withHandle: true })
  await nextTick()

  const group = page.container.querySelector('[data-slot="resizable-panel-group"]') as HTMLElement
  const panels = page.container.querySelectorAll('[data-slot="resizable-panel"]')
  const handle = page.container.querySelector('[data-slot="resizable-handle"]') as HTMLElement

  expect(group.classList).toContain('resizable')
  expect(group.classList).toContain('custom-resizable')
  expect(group.dataset.orientation).toBe('horizontal')
  expect(group.dataset.testid).toBe('resizable-group')
  expect(panels).toHaveLength(2)
  expect(panels[0]?.classList).toContain('resizable__panel')
  expect(panels[0]?.classList).toContain('custom-panel')
  expect(handle.getAttribute('role')).toBe('separator')
  expect(handle.classList).toContain('resizable__handle')
  expect(handle.classList).toContain('custom-handle')
  const grip = handle.querySelector('[data-slot="resizable-handle-grip"]') as HTMLElement
  expect(grip).not.toBeNull()
  expect(getComputedStyle(grip).height).toBe('24px')
  expect(getComputedStyle(grip).width).toBe('4px')
  expect(getComputedStyle(grip).borderRadius).toBe('10px')
  expect(page.container.querySelector('[data-testid="panel-action"]')?.textContent).toBe('已展开')
})

it('纵向布局、禁用状态和亮暗主题都消费 Nova 样式', async () => {
  const { page } = createFixture({ direction: 'vertical', disabled: true })
  await nextTick()

  const group = page.container.querySelector('[data-slot="resizable-panel-group"]') as HTMLElement
  const handle = page.container.querySelector('[data-slot="resizable-handle"]') as HTMLElement

  expect(group.dataset.orientation).toBe('vertical')
  expect(getComputedStyle(group).flexDirection).toBe('column')
  expect(handle.dataset.orientation).toBe('vertical')
  expect(handle.hasAttribute('data-disabled')).toBe(true)
  expect(getComputedStyle(handle).cursor).toBe('not-allowed')
  expect(getComputedStyle(handle).height).toBe('1px')

  group.dataset.theme = 'dark'
  expect(getComputedStyle(group).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('保留键盘调整、布局回调和面板实例方法', async () => {
  const { layout, page, panel } = createFixture()
  await nextTick()

  const handle = page.container.querySelector('[data-slot="resizable-handle"]') as HTMLElement
  const keyboardEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key: 'ArrowRight'
  })
  handle.dispatchEvent(keyboardEvent)
  await nextTick()

  expect(keyboardEvent.defaultPrevented).toBe(true)
  expect(layout).toHaveBeenCalled()
  expect(panel.value?.getSize).toBeTypeOf('function')
  expect(panel.value?.collapse).toBeTypeOf('function')

  panel.value?.collapse()
  await nextTick()
  expect(page.container.querySelector('[data-slot="resizable-panel"]')?.getAttribute('data-state')).toBe('collapsed')

  panel.value?.expand()
  await nextTick()
  expect(page.container.querySelector('[data-slot="resizable-panel"]')?.getAttribute('data-state')).toBe('expanded')
})

it('允许使用默认插槽替换可视握柄', () => {
  const Fixture = defineComponent({
    setup: () => () => h(ResizablePanelGroup, { direction: 'horizontal' }, {
      default: () => [
        h(ResizablePanel, { defaultSize: 50 }),
        h(ResizableHandle, { withHandle: true }, {
          default: () => h('span', { 'data-testid': 'custom-grip' }, '拖动')
        }),
        h(ResizablePanel, { defaultSize: 50 })
      ]
    })
  })
  const page = render(Fixture)

  expect(page.container.querySelector('[data-testid="custom-grip"]')?.textContent).toBe('拖动')
})
