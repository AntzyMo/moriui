<script setup lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from 'moriui'
</script>

<template>
  <Tabs default-value="tab1" class="w-full">
    <TabsList>
      <TabsTrigger value="tab1">
        标签一
      </TabsTrigger>
    </TabsList><TabsContent value="tab1">
      内容区域
    </TabsContent>
  </Tabs>
</template>
