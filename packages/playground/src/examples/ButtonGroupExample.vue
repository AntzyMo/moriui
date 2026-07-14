<script setup lang="ts">
  import {
    Button,
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Button Group</h2>
    <div class="playground__row">
      <ButtonGroup aria-label="文档操作">
        <Button variant="outline">
          保存
        </Button>
        <Button variant="outline">
          预览
        </Button>
        <Button variant="outline">
          发布
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="带文字与分隔线的操作">
        <ButtonGroupText>视图</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button variant="secondary">
          列表
        </Button>
        <Button variant="secondary">
          网格
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="纵向操作" orientation="vertical">
        <Button variant="outline">
          上移
        </Button>
        <Button variant="outline">
          下移
        </Button>
      </ButtonGroup>
    </div>
  </section>
</template>
