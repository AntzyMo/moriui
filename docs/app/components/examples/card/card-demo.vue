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
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>设计评审</CardTitle><CardDescription>确认本周组件交付范围。</CardDescription><CardAction>
        <Button size="sm" variant="ghost">
          查看
        </Button>
      </CardAction>
    </CardHeader><CardContent>
      <p class="text-sm text-muted-foreground">
        共 12 个组件等待评审。
      </p>
    </CardContent><CardFooter>
      <Button size="sm">
        开始评审
      </Button>
    </CardFooter>
  </Card>
</template>
