import { describe, expect, it } from 'vite-plus/test'
import { access, readdir, readFile } from 'node:fs/promises'

const appUrl = new URL('../app/', import.meta.url)

async function collectSources(directory: string) {
  const directoryUrl = new URL(directory, appUrl)
  const files = (await readdir(directoryUrl, { recursive: true })).filter(
    file => file.endsWith('.vue') || file.endsWith('.ts')
  )
  return Promise.all(files.map(file => readFile(new URL(file, directoryUrl), 'utf8')))
}

describe('atomic rebuild boundaries', () => {
  it('has removed every superseded documentation, landing, demo, utility, and theme implementation', async () => {
    const removed = [
      'components/docs/',
      'components/landing/',
      'components/demos/',
      'utils/',
      'composables/use-document-theme.ts'
    ]

    await Promise.all(
      removed.map(path => expect(access(new URL(path, appUrl))).rejects.toThrow())
    )
    await expect(access(new URL('../content/docs/overview.md', import.meta.url))).rejects.toThrow()
    await expect(access(new URL('../content/docs/theming.md', import.meta.url))).rejects.toThrow()
  })

  it('keeps every route entry on the new home/site/reference/documentation boundaries', async () => {
    const sources = await Promise.all([
      readFile(new URL('pages/index.vue', appUrl), 'utf8'),
      readFile(new URL('pages/docs/[...slug].vue', appUrl), 'utf8'),
      readFile(new URL('pages/docs/components/index.vue', appUrl), 'utf8'),
      readFile(new URL('pages/docs/components/[slug].vue', appUrl), 'utf8')
    ])
    const joined = sources.join('\n')

    expect(joined).not.toMatch(/components\/(docs|landing|demos)|use-document-theme|utils\//)
    expect(joined).toMatch(/~\/(?:components|home|site|documentation)\//)
  })

  it('uses MoriUI for interaction controls throughout all new Vue components', async () => {
    const sources = (
      await Promise.all([
        collectSources('home/'),
        collectSources('site/'),
        collectSources('components/')
      ])
    ).flat()
    const joined = sources.join('\n')

    expect(joined).not.toMatch(/<button|<input|<textarea|<select/)
    expect(joined).not.toMatch(/components\/(docs|landing|demos)/)
    expect(joined).toMatch(/from\s*['"]moriui['"]/)
  })
})
