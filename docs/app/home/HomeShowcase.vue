<script setup lang="ts">
  import ChatScene from './scenes/ChatScene.vue'
  import DashboardScene from './scenes/DashboardScene.vue'
  import ComponentsScene from './scenes/ComponentsScene.vue'

  import SiteHeader from '~/site/SiteHeader.vue'
  import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader mode="home" />
    <main class="mx-auto grid max-w-[1360px] gap-12 px-4 pb-16 pt-12 sm:px-6 lg:pt-20">
      <section class="mx-auto grid max-w-3xl justify-items-center gap-5 text-center">
        <p class="text-sm font-medium text-muted-foreground">
          Vue 3 · Nova 主题 · 可组合交互
        </p>
        <h1 class="text-4xl font-semibold tracking-tight sm:text-6xl">
          默认精致，天生可组合。
        </h1>
        <p class="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          从可靠的组件原语出发，用统一的视觉语言搭建真正属于产品的界面。
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <Button as-child>
            <NuxtLink to="/docs/components">
              浏览组件
            </NuxtLink>
          </Button>
          <Button as-child variant="secondary">
            <NuxtLink to="/docs/installation">
              安装指南
            </NuxtLink>
          </Button>
        </div>
      </section>

      <Tabs default-value="components" class="grid gap-5 rounded-2xl bg-muted/40 p-4 sm:p-6">
        <TabsList aria-label="界面场景" class="w-fit">
          <TabsTrigger value="components">
            组件
          </TabsTrigger>
          <TabsTrigger value="dashboard">
            工作台
          </TabsTrigger>
          <TabsTrigger value="chat">
            会话
          </TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          <ComponentsScene />
        </TabsContent>
        <TabsContent value="dashboard">
          <DashboardScene />
        </TabsContent>
        <TabsContent value="chat">
          <ChatScene />
        </TabsContent>
      </Tabs>
    </main>
  </div>
</template>
