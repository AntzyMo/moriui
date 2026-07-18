import { componentSlugs, guideInventory } from './inventory'

const componentRoutes = componentSlugs.map(slug => `/docs/components/${slug}`)

export const staticRoutes = [
  '/',
  ...guideInventory.map(guide => guide.path),
  '/docs/components',
  ...componentRoutes
]
