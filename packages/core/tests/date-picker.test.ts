import { nextTick } from 'vue'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import './date-picker.style.css'
import DatePickerFixture from './DatePickerFixture.vue'
import DateRangePickerFixture from './DateRangePickerFixture.vue'

function getTrigger(value: string) {
  return document.querySelector(`[data-value="${value}"]`) as HTMLButtonElement
}

it('单日期选择器支持分段输入、弹层日历、键盘选择和默认选后关闭', async () => {
  const page = render(DatePickerFixture)
  const field = page.container.querySelector('[data-slot="date-picker-field"]') as HTMLElement
  const trigger = page.getByRole('button', { name: '打开日期选择器' })

  expect(field.classList).toContain('date-picker__field')
  expect(field.querySelector('[data-slot="date-picker-input"][data-placeholder]')).not.toBeNull()
  await trigger.click()
  expect(document.querySelector('[data-slot="date-picker-content"]')).not.toBeNull()

  const tenth = getTrigger('2024-04-10')
  tenth.focus()
  tenth.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, code: 'Enter', key: 'Enter' }))
  await nextTick()
  expect((page.container.querySelector('[data-testid="value"]') as HTMLElement).textContent).toBe('2024-04-10')
  expect((document.querySelector('[data-slot="date-picker-content"]') as HTMLElement).dataset.state).toBe('closed')
})

it('日期范围选择器在起止日期完整后关闭，并呈现范围状态', async () => {
  const page = render(DateRangePickerFixture)
  await page.getByRole('button', { name: '打开日期范围选择器' }).click()

  getTrigger('2024-04-10').click()
  await nextTick()
  expect(document.querySelector('[data-slot="date-range-picker-content"]')).not.toBeNull()
  getTrigger('2024-04-15').click()
  await nextTick()

  expect((page.container.querySelector('[data-testid="range"]') as HTMLElement).textContent).toBe('2024-04-10|2024-04-15')
  expect((document.querySelector('[data-slot="date-range-picker-content"]') as HTMLElement).dataset.state).toBe('closed')
})
