import { expect, it } from 'vite-plus/test'

import styleEntry from '../src/styles/index.css?raw'

it('样式入口在所有 CSS import 之后声明 Tailwind 工具引用', () => {
  const referenceIndex = styleEntry.indexOf('@reference "tailwindcss";')
  const lastImportIndex = styleEntry.lastIndexOf('@import')

  expect(referenceIndex).toBeGreaterThan(lastImportIndex)
})
