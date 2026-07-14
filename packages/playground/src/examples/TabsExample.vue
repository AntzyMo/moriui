<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
  } from 'moriui'

  const activeTab = shallowRef('account')
</script>

<template>
  <section class="playground__section">
    <h2>Tabs</h2>
    <div class="playground__stack">
      <Tabs v-model="activeTab" class="w-full max-w-md">
        <TabsList aria-label="账户设置">
          <TabsTrigger value="account">
            账户
          </TabsTrigger>
          <TabsTrigger value="password">
            密码
          </TabsTrigger>
          <TabsTrigger disabled value="notifications">
            通知
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          管理你的公开资料与账户偏好。
        </TabsContent>
        <TabsContent value="password">
          修改密码并管理已登录的设备。
        </TabsContent>
        <TabsContent value="notifications">
          此项当前不可用。
        </TabsContent>
      </Tabs>

      <p class="playground__example-label">
        当前选择：{{ activeTab }}
      </p>

      <Tabs class="w-full max-w-md" default-value="overview">
        <TabsList aria-label="项目导航" variant="line">
          <TabsTrigger value="overview">
            概览
          </TabsTrigger>
          <TabsTrigger value="activity">
            动态
          </TabsTrigger>
          <TabsTrigger value="settings">
            设置
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          项目的概览信息。
        </TabsContent>
        <TabsContent value="activity">
          最近的协作动态。
        </TabsContent>
        <TabsContent value="settings">
          项目设置。
        </TabsContent>
      </Tabs>

      <Tabs class="h-32" default-value="profile" orientation="vertical">
        <TabsList aria-label="垂直导航" variant="line">
          <TabsTrigger value="profile">
            资料
          </TabsTrigger>
          <TabsTrigger value="security">
            安全
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          编辑个人资料。
        </TabsContent>
        <TabsContent value="security">
          配置安全选项。
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
