import { expect, it } from 'vite-plus/test'

import manifestSource from '../package.json?raw'

interface PackageManifest {
  exports: Record<string, string>
  publishConfig: {
    exports: Record<string, string>
  }
  sideEffects: string[]
}

const manifest = JSON.parse(manifestSource) as PackageManifest

it('开发态从源码导入样式，发布态提供构建后的样式资产', () => {
  expect(manifest.exports['./style.css']).toBe('./src/styles/index.css')
  expect(manifest.publishConfig.exports['./style.css']).toBe('./dist/style.css')
  expect(manifest.sideEffects).toContain('*.css')
})
