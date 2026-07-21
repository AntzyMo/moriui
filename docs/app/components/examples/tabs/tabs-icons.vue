<script setup lang="ts">
  import { AppWindow, Code } from '@lucide/vue'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>

<template>
  <Tabs default-value="preview">
    <TabsList>
      <TabsTrigger value="preview">
        <AppWindow class="size-4" />
        预览
      </TabsTrigger>
      <TabsTrigger value="code">
        <Code class="size-4" />
        代码
      </TabsTrigger>
    </TabsList>
    <TabsContent value="preview">
      预览内容
    </TabsContent>
    <TabsContent value="code">
      代码内容
    </TabsContent>
  </Tabs>
</template>
