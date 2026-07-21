<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
  } from 'moriui'

  const activeTab = defineModel<string>({ default: 'account' })
</script>

<template>
  <Tabs v-model="activeTab" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">
        账号
      </TabsTrigger>
      <TabsTrigger value="password">
        密码
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>账号信息</CardTitle>
          <CardDescription>管理您的基本信息和邮箱地址。</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          您可以使用邮箱地址或手机号登录。
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>密码设置</CardTitle>
          <CardDescription>修改您的登录密码，建议定期更换。</CardDescription>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground">
          密码长度至少为 8 位，需包含字母和数字。
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>
