<script setup lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>

<template>
  <Tabs default-value="posts">
    <TabsList variant="line">
      <TabsTrigger value="posts">
        文章
      </TabsTrigger>
      <TabsTrigger value="comments">
        评论
      </TabsTrigger>
      <TabsTrigger value="likes">
        点赞
      </TabsTrigger>
    </TabsList>
    <TabsContent value="posts">
      文章列表内容
    </TabsContent>
    <TabsContent value="comments">
      评论列表内容
    </TabsContent>
    <TabsContent value="likes">
      点赞列表内容
    </TabsContent>
  </Tabs>
</template>
