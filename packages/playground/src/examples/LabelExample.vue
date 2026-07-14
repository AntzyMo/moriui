<script setup lang="ts">
  import { Input, Label } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Label</h2>
    <div class="playground__stack max-w-sm">
      <Label for="label-example-name">
        项目名称
      </Label>
      <Input id="label-example-name" placeholder="MoriUI" />

      <Label class="text-muted-foreground" for="label-example-description">
        自定义说明标签
      </Label>
      <Input id="label-example-description" placeholder="添加项目说明" />

      <Label>
        <Input disabled default-value="不可用项目" />
        不可用项目
      </Label>
    </div>
  </section>
</template>
