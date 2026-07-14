import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { CalendarDate } from '@internationalized/date'
import { defineComponent, h, nextTick, ref } from 'vue'

import './style.css'
import Calendar from '../src/components/calendar/Calendar.vue'

const april = new CalendarDate(2024, 4, 1)

function createCalendar(rootProps: Record<string, unknown> = {}) {
  return defineComponent({
    setup: () => () => h(Calendar, {
      defaultPlaceholder: april,
      locale: 'en-US',
      ...rootProps
    })
  })
}

function getDateTrigger(container: HTMLElement, date: string) {
  return container.querySelector(`[data-slot="calendar-cell-trigger"][data-value="${date}"]`) as HTMLElement
}

it('渲染稳定槽位、默认导航图标与紧凑网格样式', () => {
  const page = render(createCalendar())
  const calendar = page.container.querySelector('[data-slot="calendar"]') as HTMLElement
  const grid = calendar.querySelector('[data-slot="calendar-grid"]') as HTMLElement

  expect(calendar.classList).toContain('calendar')
  expect(calendar.querySelector('[data-slot="calendar-header"]')).not.toBeNull()
  expect(calendar.querySelector('[data-slot="calendar-prev-icon"]')).not.toBeNull()
  expect(calendar.querySelector('[data-slot="calendar-next-icon"]')).not.toBeNull()
  expect(calendar.querySelectorAll('[data-slot="calendar-head-cell"]')).toHaveLength(7)
  expect(grid.getAttribute('role')).toBe('application')
  expect(getComputedStyle(getDateTrigger(calendar, '2024-04-15')).width).toBe('32px')

  calendar.dataset.theme = 'dark'
  expect(getComputedStyle(calendar).getPropertyValue('--background').trim()).toBe('oklch(0.145 0 0)')
})

it('支持受控单选、取消选择与键盘选择', async () => {
  const value = ref<CalendarDate | undefined>()
  const Fixture = defineComponent({
    setup: () => () => h(Calendar, {
      'defaultPlaceholder': april,
      'locale': 'en-US',
      'modelValue': value.value,
      'onUpdate:modelValue': (nextValue: CalendarDate | undefined) => {
        value.value = nextValue
      }
    })
  })
  const page = render(Fixture)
  const calendar = page.container.querySelector('[data-slot="calendar"]') as HTMLElement
  const tenth = getDateTrigger(calendar, '2024-04-10')
  const eleventh = getDateTrigger(calendar, '2024-04-11')

  tenth.focus()
  tenth.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'ArrowRight', key: 'ArrowRight' }))
  expect(document.activeElement).toBe(eleventh)

  eleventh.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Enter', key: 'Enter' }))
  await nextTick()
  expect(value.value?.toString()).toBe('2024-04-11')
  expect(eleventh.getAttribute('data-selected')).toBe('true')

  eleventh.click()
  await nextTick()
  expect(value.value).toBeUndefined()
})

it('支持多选、受控展示月份及多月布局', async () => {
  const value = ref<CalendarDate[]>([])
  const placeholder = ref<CalendarDate>(april)
  const Fixture = defineComponent({
    setup: () => () => h(Calendar, {
      'locale': 'en-US',
      'modelValue': value.value,
      'multiple': true,
      'numberOfMonths': 2,
      'placeholder': placeholder.value,
      'onUpdate:modelValue': (nextValue: CalendarDate[]) => {
        value.value = nextValue
      },
      'onUpdate:placeholder': (nextValue: CalendarDate) => {
        placeholder.value = nextValue
      }
    })
  })
  const page = render(Fixture)
  const calendar = page.container.querySelector('[data-slot="calendar"]') as HTMLElement

  expect(calendar.querySelectorAll('[data-slot="calendar-grid"]')).toHaveLength(2)
  getDateTrigger(calendar, '2024-04-10').click()
  await nextTick()
  getDateTrigger(calendar, '2024-04-11').click()
  await nextTick()
  expect(value.value.map(date => date.toString())).toEqual(['2024-04-10', '2024-04-11'])

  ;(calendar.querySelector('[data-slot="calendar-next"]') as HTMLButtonElement).click()
  await nextTick()
  expect(placeholder.value.toString()).toBe('2024-05-01')
})

it('遵守日期边界、不可用日期、只读与整组件禁用状态', async () => {
  const constrained = render(createCalendar({
    isDateUnavailable: (date: CalendarDate) => date.toString() === '2024-04-15',
    maxValue: new CalendarDate(2024, 4, 20),
    minValue: new CalendarDate(2024, 4, 10)
  }))
  const constrainedCalendar = constrained.container.querySelector('[data-slot="calendar"]') as HTMLElement

  expect((constrainedCalendar.querySelector('[data-slot="calendar-prev"]') as HTMLButtonElement).disabled).toBe(true)
  expect(getDateTrigger(constrainedCalendar, '2024-04-09').hasAttribute('data-disabled')).toBe(true)
  expect(getDateTrigger(constrainedCalendar, '2024-04-15').hasAttribute('data-unavailable')).toBe(true)

  const value = ref<CalendarDate | undefined>()
  const ReadonlyFixture = defineComponent({
    setup: () => () => h(Calendar, {
      'defaultPlaceholder': april,
      'locale': 'en-US',
      'modelValue': value.value,
      'readonly': true,
      'onUpdate:modelValue': (nextValue: CalendarDate | undefined) => {
        value.value = nextValue
      }
    })
  })
  const readonly = render(ReadonlyFixture)
  const readonlyCalendar = readonly.container.querySelector('[data-slot="calendar"]') as HTMLElement
  const readonlyDate = getDateTrigger(readonlyCalendar, '2024-04-10')
  readonlyDate.focus()
  readonlyDate.click()
  await nextTick()
  expect(document.activeElement).toBe(readonlyDate)
  expect(value.value).toBeUndefined()

  const disabled = render(createCalendar({ disabled: true }))
  const disabledCalendar = disabled.container.querySelector('[data-slot="calendar"]') as HTMLElement
  expect((disabledCalendar.querySelector('[data-slot="calendar-next"]') as HTMLButtonElement).disabled).toBe(true)
  expect(disabledCalendar.querySelector('[data-slot="calendar-grid"]')?.hasAttribute('data-disabled')).toBe(true)
})

it('完整透传标题与日期作用域插槽', () => {
  const Fixture = defineComponent({
    setup: () => () => h(Calendar, { defaultPlaceholder: april, locale: 'en-US' }, {
      heading: ({ headingValue }) => h('span', { 'data-testid': 'heading' }, `当前：${headingValue}`),
      day: ({ dayValue, today }) => h('span', { 'data-testid': `day-${dayValue}` }, today ? `今日 ${dayValue}` : dayValue)
    })
  })
  const page = render(Fixture)

  expect(page.container.querySelector('[data-testid="heading"]')?.textContent).toContain('April')
  expect(page.container.querySelector('[data-testid="day-10"]')?.textContent).toBe('10')
})
