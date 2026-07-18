import { expect, it } from 'vite-plus/test'

import { readCssPixel } from '../src/components/message-scroller/geometry'

it('几何工具安全解析 CSS 像素值', () => {
  expect(readCssPixel('16px')).toBe(16)
  expect(readCssPixel('0.5rem')).toBe(0.5)
  expect(readCssPixel('normal')).toBe(0)
  expect(readCssPixel(undefined)).toBe(0)
})
