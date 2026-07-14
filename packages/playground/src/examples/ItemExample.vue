<script setup lang="ts">
  import { Bell, ChevronRight, ImageIcon, ShieldCheck } from '@lucide/vue'
  import {
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Item</h2>
    <div class="playground__item-examples">
      <div class="playground__item-example">
        <p class="playground__example-label">
          描边与操作
        </p>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>双重验证</ItemTitle>
            <ItemDescription>通过电子邮件或手机号码验证登录。</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">
              启用
            </Button>
          </ItemActions>
        </Item>
      </div>

      <div class="playground__item-example">
        <p class="playground__example-label">
          链接与媒体
        </p>
        <Item as-child size="sm" variant="outline">
          <a href="#item-dashboard">
            <ItemMedia variant="icon">
              <ShieldCheck aria-hidden="true" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>资料已验证</ItemTitle>
              <ItemDescription>查看账户的验证状态与安全设置。</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRight aria-hidden="true" />
            </ItemActions>
          </a>
        </Item>
      </div>

      <div class="playground__item-example">
        <p class="playground__example-label">
          分组、分隔线与密度
        </p>
        <ItemGroup>
          <Item size="xs" variant="muted">
            <ItemMedia variant="icon">
              <Bell aria-hidden="true" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>通知</ItemTitle>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item size="xs" variant="muted">
            <ItemMedia variant="image">
              <img alt="抽象色彩图案" src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=120&auto=format&fit=crop&q=80">
            </ItemMedia>
            <ItemContent>
              <ItemHeader>
                <ItemTitle>品牌素材</ItemTitle>
                <ImageIcon aria-hidden="true" />
              </ItemHeader>
              <ItemDescription>图片资源已更新。</ItemDescription>
              <ItemFooter>刚刚</ItemFooter>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </div>
  </section>
</template>
