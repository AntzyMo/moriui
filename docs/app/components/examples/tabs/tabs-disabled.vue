<script setup lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>

<template>
  <Tabs default-value="home">
    <TabsList>
      <TabsTrigger value="home">
        首页
      </TabsTrigger>
      <TabsTrigger value="settings" disabled>
        设置
      </TabsTrigger>
    </TabsList>
    <TabsContent value="home">
      首页内容
    </TabsContent>
    <TabsContent value="settings">
      设置内容（已禁用）
    </TabsContent>
  </Tabs>
</template>
