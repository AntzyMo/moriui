<script setup lang="ts">
  import {
    Copy,
    Download,
    FileText,
    RefreshCcw,
    ThumbsDown,
    ThumbsUp
  } from '@lucide/vue'
  import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    BubbleGroup,
    BubbleReactions,
    Button,
    Marker,
    MarkerContent,
    MarkerIcon,
    Message,
    MessageAvatar,
    MessageContent,
    MessageFooter,
    MessageGroup,
    MessageHeader,
    Spinner
  } from 'moriui'
</script>

<template>
  <section class="playground__section">
    <h2>Message</h2>
    <div class="playground__message-examples">
      <div class="playground__message-example">
        <p class="playground__example-label">
          基础收发与连续气泡
        </p>
        <div class="grid gap-6">
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>生产环境部署得怎么样了？</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <BubbleGroup>
                <Bubble variant="muted">
                  <BubbleContent>部署已经完成，健康检查全部通过。</BubbleContent>
                </Bubble>
                <Bubble variant="muted">
                  <BubbleContent>我会继续观察接下来的错误率。</BubbleContent>
                </Bubble>
              </BubbleGroup>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          Avatar 与回退内容
        </p>
        <div class="grid gap-4">
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage alt="MoriUI 客服头像" src="https://github.com/shadcn.png" />
                <AvatarFallback>MU</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>我找到导致失败的依赖安装步骤了。</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="tinted">
                <BubbleContent>请把具体日志链接发给我。</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          连续 MessageGroup
        </p>
        <div class="grid gap-6">
          <MessageGroup>
            <Message>
              <MessageContent>
                <Bubble variant="secondary">
                  <BubbleContent>组件和示例已经同步到 UI 注册表。</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageContent>
                <Bubble variant="secondary">
                  <BubbleContent>样式入口也已在构建产物中确认。</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
          <MessageGroup>
            <Message align="end">
              <MessageAvatar />
              <MessageContent>
                <Bubble variant="tinted">
                  <BubbleContent>好的，我来复查一次。</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>我</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="tinted">
                  <BubbleContent>确认后再通知团队。</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          群聊、加载状态与 Ghost 长文本
        </p>
        <div class="grid gap-4">
          <Message align="end">
            <MessageContent>
              <Bubble variant="tinted">
                <BubbleContent>@Mori，仪表盘为什么显示零个用户？</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <MessageGroup>
            <Message>
              <MessageAvatar>
                <Avatar><AvatarFallback>伊</AvatarFallback></Avatar>
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>你说的“零个”具体是指什么？</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar />
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>我正在检查生产日志。</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
          <Message>
            <Marker role="status">
              <MarkerIcon><Spinner aria-label="正在检查日志" /></MarkerIcon>
              <MarkerContent>正在检查日志…</MarkerContent>
            </Marker>
          </Message>
          <Message>
            <MessageContent>
              <MessageHeader>助手分析</MessageHeader>
              <Bubble variant="ghost">
                <BubbleContent>
                  已确认查询条件错误地过滤了活跃用户。修正过滤条件后，列表会恢复展示；建议随后补充一条回归测试，避免此类静默空结果再次出现。
                </BubbleContent>
              </Bubble>
              <MessageFooter>内部说明</MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          Header、Footer 与反应
        </p>
        <div class="grid gap-5">
          <Message>
            <MessageContent>
              <MessageHeader><span>Olivia</span><span class="ml-auto font-normal">1 分钟前</span></MessageHeader>
              <Bubble variant="muted">
                <BubbleContent>重试完成，缺失的发票已经重新写入。</BubbleContent>
                <BubbleReactions>
                  <Button size="xs" variant="ghost">
                    谢谢
                  </Button>
                </BubbleReactions>
              </Bubble>
              <MessageFooter class="gap-2">
                <span>来自支持队列</span>
                <Button size="xs" variant="ghost">
                  复制
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <MessageHeader class="justify-end">
                我
              </MessageHeader>
              <Bubble><BubbleContent>请将这条说明加入发布公告。</BubbleContent></Bubble>
              <MessageFooter class="gap-2">
                <span>已送达</span><Button size="xs" variant="ghost">
                  撤销
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          单附件消息
        </p>
        <div class="grid gap-4">
          <Message align="end">
            <MessageContent>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img alt="办公室会议空间" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop&q=80">
                </AttachmentMedia>
              </Attachment>
              <Bubble><BubbleContent>这张图片用于 PDF 的封面页。</BubbleContent></Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>PDF 已生成，附件在这里。</BubbleContent>
              </Bubble>
              <Attachment>
                <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia>
                <AttachmentContent><AttachmentTitle>sales-dashboard.pdf</AttachmentTitle><AttachmentDescription>PDF · 2.4 MB</AttachmentDescription></AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    as="a"
                    href="#download"
                    aria-label="下载 sales-dashboard.pdf"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <Download aria-hidden="true" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          附件组消息
        </p>
        <div class="grid gap-4">
          <Message align="end">
            <MessageContent>
              <AttachmentGroup class="w-[80%]">
                <Attachment orientation="vertical">
                  <AttachmentMedia variant="image">
                    <img alt="办公室" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=360&auto=format&fit=crop&q=80">
                  </AttachmentMedia>
                </Attachment>
                <Attachment orientation="vertical">
                  <AttachmentMedia variant="image">
                    <img alt="办公桌" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=360&auto=format&fit=crop&q=80">
                  </AttachmentMedia>
                </Attachment>
                <Attachment orientation="vertical">
                  <AttachmentMedia variant="image">
                    <img alt="工作空间" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=360&auto=format&fit=crop&q=80">
                  </AttachmentMedia>
                </Attachment>
              </AttachmentGroup>
              <Bubble><BubbleContent>这是品牌图片，请加入演示文稿。</BubbleContent></Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>草稿演示文稿和导出的资产都已准备好。</BubbleContent>
              </Bubble>
              <AttachmentGroup>
                <Attachment size="sm">
                  <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia><AttachmentContent><AttachmentTitle>brand-deck.pdf</AttachmentTitle><AttachmentDescription>PDF · 3.1 MB</AttachmentDescription></AttachmentContent>
                </Attachment>
                <Attachment size="sm">
                  <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia><AttachmentContent><AttachmentTitle>brand-assets.zip</AttachmentTitle><AttachmentDescription>ZIP · 4.2 MB</AttachmentDescription></AttachmentContent>
                </Attachment>
              </AttachmentGroup>
            </MessageContent>
          </Message>
        </div>
      </div>

      <div class="playground__message-example">
        <p class="playground__example-label">
          Footer 操作与失败重试
        </p>
        <div class="grid gap-5">
          <Message align="end">
            <MessageContent>
              <Bubble><BubbleContent>部署目前是什么状态？</BubbleContent></Bubble>
              <MessageFooter>
                <Button
                  aria-label="复制消息"
                  size="icon"
                  title="复制消息"
                  variant="ghost"
                >
                  <Copy aria-hidden="true" />
                </Button>
                <Button
                  aria-label="重试请求"
                  size="icon"
                  title="重试请求"
                  variant="ghost"
                >
                  <RefreshCcw aria-hidden="true" />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar><Avatar><AvatarFallback>支</AvatarFallback></Avatar></MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>失败来自工作区依赖，我可以打开日志或重新执行部署。</BubbleContent>
              </Bubble>
              <MessageFooter>
                <Button
                  aria-label="赞同"
                  size="icon"
                  title="赞同"
                  variant="ghost"
                >
                  <ThumbsUp aria-hidden="true" />
                </Button>
                <Button
                  aria-label="不赞同"
                  size="icon"
                  title="不赞同"
                  variant="ghost"
                >
                  <ThumbsDown aria-hidden="true" />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble variant="outline">
                <BubbleContent>请把链接发给我，我来检查。</BubbleContent>
              </Bubble>
              <MessageFooter class="gap-2">
                <span class="font-normal text-destructive">发送失败</span><Button size="xs" variant="secondary">
                  重试
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </div>
      </div>
    </div>
  </section>
</template>
