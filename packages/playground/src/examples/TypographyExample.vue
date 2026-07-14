<script setup lang="ts">
  import { Typography } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Typography</h2>
    <div class="playground__stack max-w-xl">
      <Typography>
        默认 Typography 渲染为语义化正文段落。
      </Typography>
      <Typography type="h1">
        一级标题
      </Typography>
      <Typography type="h3" weight="bold">
        可覆盖标题字重
      </Typography>
      <Typography color="muted">
        次级说明文字使用 muted 前景色。
      </Typography>
      <Typography align="center">
        居中对齐的正文。
      </Typography>
      <Typography class="max-w-48" truncate>
        这是一段会在受限宽度中显示省略号的长文本内容。
      </Typography>
      <Typography type="code">
        import &#123; Typography &#125; from 'moriui'
      </Typography>
      <Typography as="a" href="#typography-example" type="body-sm">
        作为链接渲染的正文
      </Typography>
    </div>
  </section>
</template>
