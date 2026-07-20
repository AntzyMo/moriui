<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>
<template>
  <Tabs default-value="profile" orientation="vertical">
    <TabsList>
      <TabsTrigger value="profile">个人资料</TabsTrigger>
      <TabsTrigger value="security">安全设置</TabsTrigger>
      <TabsTrigger value="notifications">通知偏好</TabsTrigger>
    </TabsList>
    <TabsContent value="profile">个人资料设置内容</TabsContent>
    <TabsContent value="security">安全设置内容</TabsContent>
    <TabsContent value="notifications">通知偏好设置内容</TabsContent>
  </Tabs>
</template>
