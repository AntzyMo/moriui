import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick } from 'vue'

import Avatar from '../src/components/avatar/Avatar.vue'
import AvatarBadge from '../src/components/avatar/AvatarBadge.vue'
import AvatarGroup from '../src/components/avatar/AvatarGroup.vue'
import AvatarImage from '../src/components/avatar/AvatarImage.vue'
import MessageAvatar from '../src/components/message/MessageAvatar.vue'
import AvatarFallback from '../src/components/avatar/AvatarFallback.vue'
import AvatarGroupCount from '../src/components/avatar/AvatarGroupCount.vue'

import './style.css'

class MockImage {
  static instances: MockImage[] = []

  complete = false
  naturalWidth = 0
  src = ''
  referrerPolicy = ''
  crossOrigin: string | null = null
  private listeners = new Map<string, Set<() => void>>()

  constructor() {
    MockImage.instances.push(this)
  }

  addEventListener(event: string, listener: () => void) {
    const listeners = this.listeners.get(event) ?? new Set<() => void>()
    listeners.add(listener)
    this.listeners.set(event, listeners)
  }

  removeEventListener(event: string, listener: () => void) {
    this.listeners.get(event)?.delete(listener)
  }

  load() {
    this.complete = true
    this.naturalWidth = 1
    this.listeners.get('load')?.forEach(listener => listener())
  }
}

const originalImage = window.Image

afterEach(() => {
  window.Image = originalImage
  MockImage.instances = []
})

it('默认渲染 Avatar，并透传属性、事件与调用方类名', () => {
  const onClick = vi.fn()
  const page = render(Avatar, {
    attrs: {
      'aria-label': '王小明',
      'data-testid': 'user-avatar',
      onClick
    },
    props: { class: 'custom-avatar' },
    slots: { default: 'WX' }
  })
  const avatar = page.container.querySelector('[data-slot="avatar"]') as HTMLElement

  expect(avatar.tagName).toBe('SPAN')
  expect(avatar.dataset.size).toBe('default')
  expect(avatar.classList).toContain('avatar')
  expect(avatar.classList).toContain('avatar--default-size')
  expect(avatar.classList).toContain('custom-avatar')
  expect(avatar.getAttribute('aria-label')).toBe('王小明')
  expect(avatar.dataset.testid).toBe('user-avatar')

  avatar.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it.each([
  ['sm', '24px'],
  ['default', '32px'],
  ['lg', '40px']
] as const)('应用 %s 尺寸', (size, expectedWidth) => {
  const page = render(Avatar, { props: { size } })
  const avatar = page.container.querySelector('[data-slot="avatar"]') as HTMLElement

  expect(avatar.dataset.size).toBe(size)
  expect(getComputedStyle(avatar).width).toBe(expectedWidth)
})

it('支持 as 与 asChild 多态渲染', () => {
  const asButton = render(Avatar, { props: { as: 'button' } })
  expect(asButton.container.querySelector('button')?.dataset.slot).toBe('avatar')

  const Fixture = defineComponent({
    setup: () => () =>
      h(Avatar, { asChild: true }, { default: () => h('a', { href: '#profile' }, '查看资料') })
  })
  const asChild = render(Fixture)
  const link = asChild.container.querySelector('a')

  expect(link?.dataset.slot).toBe('avatar')
  expect(link?.getAttribute('href')).toBe('#profile')
})

describe('图片与回退状态', () => {
  it('图片加载完成后隐藏回退、显示图片并转发状态事件', async () => {
    window.Image = MockImage as never
    const onLoadingStatusChange = vi.fn()
    const Fixture = defineComponent({
      setup: () => () =>
        h(
          Avatar,
          {},
          {
            default: () => [
              h(AvatarImage, {
                alt: '王小明头像',
                src: '/avatar.png',
                onLoadingStatusChange
              }),
              h(AvatarFallback, {}, { default: () => 'WX' })
            ]
          }
        )
    })
    const page = render(Fixture)

    await nextTick()
    const image = page.container.querySelector('[data-slot="avatar-image"]') as HTMLImageElement
    expect(image.style.display).toBe('none')
    expect(page.container.textContent).toContain('WX')

    MockImage.instances[0]?.load()
    await nextTick()

    expect(image.style.display).not.toBe('none')
    expect(page.container.textContent).not.toContain('WX')
    expect(onLoadingStatusChange).toHaveBeenCalledWith('loaded')
  })

  it('回退内容支持延迟显示', async () => {
    const page = render(Avatar, {
      slots: {
        default: () => h(AvatarFallback, { delayMs: 10 }, { default: () => 'WX' })
      }
    })

    expect(page.container.textContent).not.toContain('WX')
    await new Promise(resolve => window.setTimeout(resolve, 30))
    await nextTick()
    expect(page.container.textContent).toContain('WX')
  })
})

it('角标随 Avatar 尺寸同步，并保留调用方样式', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Avatar,
        { size: 'sm' },
        {
          default: () =>
            h(
              AvatarBadge,
              { class: 'custom-avatar-badge' },
              {
                default: () => h('svg', { viewBox: '0 0 24 24' })
              }
            )
        }
      )
  })
  const page = render(Fixture)
  const badge = page.container.querySelector('[data-slot="avatar-badge"]') as HTMLElement
  const icon = badge.querySelector('svg') as SVGElement

  expect(badge.classList).toContain('custom-avatar-badge')
  expect(getComputedStyle(badge).width).toBe('8px')
  expect(getComputedStyle(icon).display).toBe('none')
})

it('群组重叠 Avatar，并让计数项跟随最大尺寸', () => {
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        AvatarGroup,
        {},
        {
          default: () => [
            h(Avatar, { size: 'sm' }),
            h(Avatar, { size: 'default' }),
            h(Avatar, { size: 'lg' }),
            h(AvatarGroupCount, {}, { default: () => [h('svg', { viewBox: '0 0 24 24' }), '+3'] })
          ]
        }
      )
  })
  const page = render(Fixture)
  const avatars = page.container.querySelectorAll('[data-slot="avatar"]')
  const group = page.container.querySelector('[data-slot="avatar-group"]') as HTMLElement
  const count = page.container.querySelector('[data-slot="avatar-group-count"]') as HTMLElement
  const icon = count.querySelector('svg') as SVGElement

  expect(getComputedStyle(avatars[0] as HTMLElement).marginRight).toBe('-8px')
  expect(getComputedStyle(group).display).toBe('flex')
  expect(getComputedStyle(count).width).toBe('40px')
  expect(getComputedStyle(icon).width).toBe('20px')
  expect(getComputedStyle(count).boxShadow).not.toBe('none')
})

it('messageAvatar 默认渲染 div，并支持 asChild', () => {
  const defaultPage = render(MessageAvatar, {
    attrs: { 'aria-label': '客服头像' },
    slots: { default: '客' }
  })
  const messageAvatar = defaultPage.container.querySelector('div') as HTMLElement

  expect(messageAvatar.dataset.slot).toBe('message-avatar')
  expect(messageAvatar.getAttribute('aria-label')).toBe('客服头像')
  expect(getComputedStyle(messageAvatar).alignSelf).toBe('flex-end')

  const Fixture = defineComponent({
    setup: () => () =>
      h(MessageAvatar, { asChild: true }, { default: () => h('a', { href: '#message' }, '消息') })
  })
  const asChild = render(Fixture)
  expect(asChild.container.querySelector('a')?.dataset.slot).toBe('message-avatar')
})
