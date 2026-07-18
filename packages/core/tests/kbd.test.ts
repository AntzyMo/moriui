import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import Kbd from '../src/components/kbd/Kbd.vue'
import KbdGroup from '../src/components/kbd/KbdGroup.vue'
import InputGroup from '../src/components/input-group/InputGroup.vue'
import InputGroupAddon from '../src/components/input-group/InputGroupAddon.vue'
import InputGroupInput from '../src/components/input-group/InputGroupInput.vue'

import './style.css'

it('默认渲染 Kbd 语义元素并透传属性、事件和调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Kbd, {
    attrs: {
      'aria-label': '打开命令菜单的快捷键',
      'data-testid': 'command-shortcut',
      onClick
    },
    props: {
      class: 'custom-kbd'
    },
    slots: {
      default: '⌘'
    }
  })
  const kbd = page.container.querySelector('[data-slot="kbd"]') as HTMLElement

  expect(kbd.tagName).toBe('KBD')
  expect(kbd.classList).toContain('kbd')
  expect(kbd.classList).toContain('custom-kbd')
  expect(kbd.getAttribute('aria-label')).toBe('打开命令菜单的快捷键')
  expect(kbd.dataset.testid).toBe('command-shortcut')

  kbd.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(onClick).toHaveBeenCalledOnce()
})

it('kbdGroup 使用稳定槽位并以 4px 间距组合按键', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        KbdGroup,
        { class: 'custom-kbd-group' },
        {
          default: () => [h(Kbd, {}, { default: () => '⌘' }), h(Kbd, {}, { default: () => 'K' })]
        }
      )
  })
  const page = render(Fixture)
  const group = page.container.querySelector('[data-slot="kbd-group"]') as HTMLElement
  const keys = group.querySelectorAll('[data-slot="kbd"]')

  expect(group.tagName).toBe('KBD')
  expect(group.classList).toContain('kbd-group')
  expect(group.classList).toContain('custom-kbd-group')
  expect(keys).toHaveLength(2)
  expect(getComputedStyle(group).gap).toBe('4px')
})

it('使用主题和局部 Token，并允许调用方覆盖默认颜色', () => {
  const defaultPage = render(Kbd)
  const utilityPage = render(Kbd, {
    props: {
      class: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
    }
  })
  const customPage = render(Kbd, {
    attrs: {
      style: '--kbd-bg: rgb(1, 2, 3); --kbd-fg: rgb(4, 5, 6);'
    }
  })
  const defaultKbd = defaultPage.container.querySelector('[data-slot="kbd"]') as HTMLElement
  const utilityKbd = utilityPage.container.querySelector('[data-slot="kbd"]') as HTMLElement
  const customKbd = customPage.container.querySelector('[data-slot="kbd"]') as HTMLElement
  const host = defaultPage.container as HTMLElement

  expect(getComputedStyle(defaultKbd).getPropertyValue('--kbd-bg').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--muted').trim()
  )
  expect(getComputedStyle(defaultKbd).getPropertyValue('--kbd-fg').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--muted-foreground').trim()
  )
  expect(utilityKbd.classList).toContain('bg-blue-50')
  expect(utilityKbd.classList).toContain('text-blue-700')
  expect(getComputedStyle(utilityKbd).backgroundColor).not.toBe(
    getComputedStyle(defaultKbd).backgroundColor
  )
  expect(getComputedStyle(utilityKbd).color).not.toBe(getComputedStyle(defaultKbd).color)
  expect(customKbd.style.getPropertyValue('--kbd-bg')).toBe('rgb(1, 2, 3)')
  expect(customKbd.style.getPropertyValue('--kbd-fg')).toBe('rgb(4, 5, 6)')
  expect(getComputedStyle(customKbd).backgroundColor).not.toBe(
    getComputedStyle(defaultKbd).backgroundColor
  )
  expect(getComputedStyle(customKbd).color).not.toBe(getComputedStyle(defaultKbd).color)

  host.dataset.theme = 'dark'
  expect(getComputedStyle(defaultKbd).getPropertyValue('--kbd-bg').trim()).toBe(
    getComputedStyle(host).getPropertyValue('--muted').trim()
  )
  expect(getComputedStyle(host).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('inputGroup 附加项中的 Kbd 使用表单组件约定的圆角', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        InputGroup,
        {},
        {
          default: () => [
            h(InputGroupInput, { 'aria-label': '搜索' }),
            h(
              InputGroupAddon,
              { align: 'inline-end' },
              {
                default: () => h(Kbd, {}, { default: () => '/' })
              }
            )
          ]
        }
      )
  })
  const page = render(Fixture)
  const kbd = page.container.querySelector(
    '[data-slot="input-group-addon"] [data-slot="kbd"]'
  ) as HTMLElement

  expect(getComputedStyle(kbd).borderRadius).toBe('6px')
})
