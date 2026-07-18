import { expect, it, vi } from 'vite-plus/test'

import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'

import './style.css'
import Skeleton from '../src/components/skeleton/Skeleton.vue'

it('默认渲染 div，并透传属性、事件和调用方 class', () => {
  const onClick = vi.fn()
  const page = render(Skeleton, {
    attrs: {
      'aria-label': '正在加载内容',
      'data-testid': 'content-skeleton',
      onClick
    },
    props: {
      class: 'custom-skeleton'
    }
  })
  const skeleton = page.container.querySelector('div') as HTMLElement

  expect(skeleton.dataset.slot).toBe('skeleton')
  expect(skeleton.classList).toContain('skeleton')
  expect(skeleton.classList).toContain('custom-skeleton')
  expect(skeleton.getAttribute('aria-label')).toBe('正在加载内容')
  expect(skeleton.dataset.testid).toBe('content-skeleton')
  expect(skeleton.getAttribute('role')).toBeNull()

  skeleton.click()
  expect(onClick).toHaveBeenCalledOnce()
})

it('支持 as 与 asChild 多态渲染，并保留插槽内容', () => {
  const asSpan = render(Skeleton, {
    props: { as: 'span' },
    slots: { default: '加载中' }
  })
  const span = asSpan.container.querySelector('span') as HTMLElement

  expect(span.dataset.slot).toBe('skeleton')
  expect(span.textContent).toBe('加载中')

  const AsChildFixture = defineComponent({
    setup: () => () =>
      h(
        Skeleton,
        { asChild: true },
        {
          default: () => h('article', { 'data-testid': 'article-skeleton' }, '文章加载中')
        }
      )
  })
  const asChild = render(AsChildFixture)
  const article = asChild.container.querySelector(
    '[data-testid="article-skeleton"]'
  ) as HTMLElement

  expect(article.dataset.slot).toBe('skeleton')
  expect(article.classList).toContain('skeleton')
  expect(article.textContent).toBe('文章加载中')
})

it('使用主题 muted Token，且允许调用方覆盖局部 Token', () => {
  const defaultPage = render(Skeleton)
  const tokenPage = render(Skeleton, {
    attrs: {
      style: '--skeleton-bg: rgb(1, 2, 3);'
    }
  })
  const host = defaultPage.container as HTMLElement
  const skeleton = defaultPage.container.querySelector('[data-slot="skeleton"]') as HTMLElement
  const tokenSkeleton = tokenPage.container.querySelector('[data-slot="skeleton"]') as HTMLElement

  expect(getComputedStyle(skeleton).backgroundColor).toBe(
    getComputedStyle(host).getPropertyValue('--muted').trim()
  )
  expect(tokenSkeleton.style.getPropertyValue('--skeleton-bg')).toBe('rgb(1, 2, 3)')
  expect(getComputedStyle(tokenSkeleton).backgroundColor).not.toBe(
    getComputedStyle(skeleton).backgroundColor
  )

  host.dataset.theme = 'dark'
  expect(getComputedStyle(skeleton).backgroundColor).toBe(
    getComputedStyle(host).getPropertyValue('--muted').trim()
  )
})

it('应用脉冲动效，并在减少动效环境下提供静态规则', () => {
  const page = render(Skeleton)
  const skeleton = page.container.querySelector('[data-slot="skeleton"]') as HTMLElement
  const hasReducedMotionRule = Array.from(document.styleSheets).some(sheet => {
    try {
      return Array.from(sheet.cssRules).some(
        rule =>
          rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')
      )
    } catch {
      return false
    }
  })

  expect(getComputedStyle(skeleton).animationName).not.toBe('none')
  expect(hasReducedMotionRule).toBe(true)
})
