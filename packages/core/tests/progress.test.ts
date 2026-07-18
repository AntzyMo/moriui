import { expect, it } from 'vite-plus/test'

import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, shallowRef } from 'vue'

import Progress from '../src/components/progress/Progress.vue'
import ProgressLabel from '../src/components/progress/ProgressLabel.vue'
import ProgressTrack from '../src/components/progress/ProgressTrack.vue'
import ProgressValue from '../src/components/progress/ProgressValue.vue'
import ProgressIndicator from '../src/components/progress/ProgressIndicator.vue'

import './style.css'

function renderProgress(modelValue?: number | null, max?: number) {
  return render(Progress, {
    props: { modelValue, max },
    slots: {
      default: () => [
        h(ProgressLabel, {}, { default: () => '上传文件' }),
        h(ProgressValue),
        h(ProgressTrack, () => h(ProgressIndicator))
      ]
    }
  })
}

it('渲染 Reka 的进度语义、稳定槽位与默认百分比', () => {
  const page = renderProgress(40, 80)
  const root = page.container.querySelector('[data-slot="progress"]') as HTMLElement
  const track = page.container.querySelector('[data-slot="progress-track"]') as HTMLElement
  const indicator = page.container.querySelector('[data-slot="progress-indicator"]') as HTMLElement
  const label = page.container.querySelector('[data-slot="progress-label"]') as HTMLElement
  const value = page.container.querySelector('[data-slot="progress-value"]') as HTMLElement

  expect(root.getAttribute('role')).toBe('progressbar')
  expect(root.dataset.state).toBe('loading')
  expect(root.getAttribute('aria-valuemin')).toBe('0')
  expect(root.getAttribute('aria-valuemax')).toBe('80')
  expect(root.getAttribute('aria-valuenow')).toBe('40')
  expect(track.classList).toContain('progress__track')
  expect(indicator.classList).toContain('progress__indicator')
  expect(indicator.style.transform).toBe('translateX(-50%)')
  expect(label.textContent).toBe('上传文件')
  expect(value.textContent).toBe('50%')
})

it('使用 v-model 更新确定进度并完整透传根默认作用域插槽', async () => {
  const value = shallowRef<number | null>(20)
  const Fixture = defineComponent({
    setup: () => () =>
      h(
        Progress,
        {
          'max': 80,
          'modelValue': value.value,
          'onUpdate:modelValue': (nextValue: number | null) => {
            value.value = nextValue
          }
        },
        {
          default: ({ modelValue }: { modelValue: number | null | undefined }) => [
            h('output', { 'data-model-value': modelValue }, String(modelValue)),
            h(ProgressTrack, () => h(ProgressIndicator))
          ]
        }
      )
  })
  const page = render(Fixture)
  const indicator = page.container.querySelector('[data-slot="progress-indicator"]') as HTMLElement

  expect(page.container.querySelector('output')?.dataset.modelValue).toBe('20')
  expect(indicator.style.transform).toBe('translateX(-75%)')

  value.value = 80
  await nextTick()

  const root = page.container.querySelector('[data-slot="progress"]') as HTMLElement
  expect(root.dataset.state).toBe('complete')
  expect(indicator.style.transform).toBe('translateX(0%)')
})

it('未传值时渲染不定状态，并保留减少动效样式', () => {
  const page = renderProgress()
  const root = page.container.querySelector('[data-slot="progress"]') as HTMLElement
  const indicator = page.container.querySelector('[data-slot="progress-indicator"]') as HTMLElement
  const value = page.container.querySelector('[data-slot="progress-value"]') as HTMLElement

  expect(root.dataset.state).toBe('indeterminate')
  expect(root.getAttribute('aria-valuenow')).toBeNull()
  expect(indicator.style.transform).toBe('')
  expect(getComputedStyle(indicator).animationName).toBe('progress-indeterminate')
  expect(value.textContent).toBe('')
})

it('合并调用方样式、透传属性，并响应暗色主题 Token', () => {
  const page = render(Progress, {
    attrs: {
      'aria-describedby': 'upload-help',
      'data-testid': 'upload-progress'
    },
    props: {
      as: 'section',
      class: 'custom-progress',
      modelValue: 10
    },
    slots: {
      default: () =>
        h(ProgressTrack, { class: 'custom-track' }, () =>
          h(ProgressIndicator, { class: 'custom-indicator' }))
    }
  })
  const root = page.container.querySelector('section') as HTMLElement
  const track = page.container.querySelector('[data-slot="progress-track"]') as HTMLElement
  const indicator = page.container.querySelector('[data-slot="progress-indicator"]') as HTMLElement

  root.dataset.theme = 'dark'
  expect(root.classList).toContain('progress')
  expect(root.classList).toContain('custom-progress')
  expect(root.getAttribute('aria-describedby')).toBe('upload-help')
  expect(root.dataset.testid).toBe('upload-progress')
  expect(track.classList).toContain('custom-track')
  expect(indicator.classList).toContain('custom-indicator')
  expect(getComputedStyle(root).getPropertyValue('--progress-track').trim()).toBe(
    getComputedStyle(root).getPropertyValue('--muted').trim()
  )
  expect(getComputedStyle(root).getPropertyValue('--progress-indicator').trim()).toBe(
    getComputedStyle(root).getPropertyValue('--primary').trim()
  )
})

it('为 ProgressValue 默认插槽提供完整进度数据', () => {
  const page = render(Progress, {
    props: { modelValue: 40, max: 80 },
    slots: {
      default: () => [
        h(
          ProgressValue,
          {},
          {
            default: ({
              value,
              max,
              percentage,
              state
            }: {
              value: number | null
              max: number
              percentage: number | null
              state: string
            }) => h('output', { 'data-state': state }, `${value}/${max}:${percentage}`)
          }
        ),
        h(ProgressTrack, () => h(ProgressIndicator))
      ]
    }
  })

  const output = page.container.querySelector('output') as HTMLElement
  expect(output.textContent).toBe('40/80:50')
  expect(output.dataset.state).toBe('loading')
})
