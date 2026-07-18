import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vite-plus/test'

describe('new home entry', () => {
  it('uses the home-mode header and a MoriUI Tabs showcase without legacy imports', async () => {
    const [showcase, page] = await Promise.all([
      readFile(new URL('../app/home/HomeShowcase.vue', import.meta.url), 'utf8'),
      readFile(new URL('../app/pages/index.vue', import.meta.url), 'utf8')
    ])

    expect(showcase).toMatch(/<SiteHeader mode="home"/)
    expect(showcase).toMatch(/默认精致，天生可组合。/)
    expect(showcase).toMatch(/<Tabs[^>]*default-value="components"/)
    expect(showcase).toMatch(/<TabsTrigger value="components">组件<\/TabsTrigger>/)
    expect(showcase).toMatch(/<ComponentsScene\s*\/>/)
    expect(showcase).toMatch(/<DashboardScene\s*\/>/)
    expect(showcase).toMatch(/<ChatScene\s*\/>/)
    expect(page).toMatch(/~\/home\/HomeShowcase\.vue/)
    expect(page).not.toMatch(/components\/(docs|landing|demos)/)
  })

  it('builds every scene from MoriUI components and Nova token utility classes', async () => {
    const sources = await Promise.all(
      ['ComponentsScene', 'DashboardScene', 'ChatScene'].map(name =>
        readFile(new URL(`../app/home/scenes/${name}.vue`, import.meta.url), 'utf8')
      )
    )

    for (const source of sources) {
      expect(source).toMatch(/from\s*['"]moriui['"]/)
      expect(source).not.toMatch(/--(?:primary|background|foreground|card)\s*:/)
      expect(source).not.toMatch(/<button|<input|<textarea|<select/)
    }
    expect(sources[0]).toMatch(/<Input|<Button|<Dialog/)
    expect(sources[1]).toMatch(/<Card/)
    expect(sources[2]).toMatch(/<Avatar/)
  })

  it('将组件场景实现为五列错位的产品卡片拼贴', async () => {
    const source = await readFile(
      new URL('../app/home/scenes/ComponentsScene.vue', import.meta.url),
      'utf8'
    )

    expect(source).toMatch(/overflow-x-auto/)
    expect(source).toMatch(
      /class="[^"]*min-w-0[^"]*w-full[^"]*max-w-full[^"]*overflow-x-auto[^"]*"/
    )
    expect(source).toMatch(/\[contain:inline-size\]/)
    expect(source).toMatch(/min-\[1650px\]:\[contain:none\]/)
    expect(source).not.toMatch(/(?:sm:)?-mx-[46]/)
    expect(source).toMatch(/grid-cols-\[15rem_18rem_18rem_18rem_15rem\]/)
    expect(source).toMatch(/<Card[\s>]/)
    expect(source).toMatch(/<Textarea[\s>]/)
    expect(source).toMatch(/<Checkbox[\s>]/)
    expect(source).toMatch(/<RadioGroup[\s>]/)
    expect(source).toMatch(/<Select[\s>]/)
    expect(source).toMatch(/<Progress[\s>]/)
    expect(source).toMatch(/<Empty[\s>]/)
    expect(source).toMatch(/<DropdownMenu[\s>]/)
    expect(source).toMatch(/<Avatar[\s>]/)
    expect(source).toMatch(/<AvatarFallback[\s>]/)
    expect(source).toMatch(
      /role="img"[^>]*aria-label="组件采用趋势：12月 58，1月 100，2月 82，3月 104，4月 68"/
    )
    expect(source).toMatch(
      /role="img"[^>]*aria-label="使用分析：近 30 天 418\.2K 次渲染，较前期增长 12%"/
    )
    expect(source).toMatch(/较前期增长 12%/)
    expect(source).toMatch(/<DialogTrigger as-child>/)
    expect(source).toMatch(/const searchQuery = shallowRef\(/)
    expect(source).toMatch(/const compositionName = shallowRef\(/)
    expect(source).toMatch(/const releaseNotifications = shallowRef\(/)
    expect(source).not.toMatch(/<style/)
    expect(source).not.toMatch(/<(?:button|input|textarea|select)[\s>]/)
  })
})
