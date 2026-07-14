<script setup lang="ts">
  import {
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Card</h2>
    <div class="playground__card-examples">
      <Card>
        <CardHeader>
          <CardTitle>项目概览</CardTitle>
          <CardDescription>查看本周的组件发布和质量检查结果。</CardDescription>
          <CardAction>
            <Button size="xs" variant="ghost">
              更多
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          共有 12 个组件通过了类型检查与浏览器测试。
        </CardContent>
        <CardFooter class="justify-end gap-2">
          <Button size="sm" variant="outline">
            查看详情
          </Button>
          <Button size="sm">
            继续
          </Button>
        </CardFooter>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>小号密度</CardTitle>
          <CardDescription>适用于紧凑的信息摘要。</CardDescription>
        </CardHeader>
        <CardContent>间距会由局部 Token 自动缩小。</CardContent>
      </Card>
    </div>
  </section>
</template>
