<script setup lang="ts">
  import { shallowRef } from 'vue'
  import {
    Avatar,
    AvatarFallback,
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Input,
    Progress,
    ProgressIndicator,
    ProgressLabel,
    ProgressTrack,
    ProgressValue,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectTrigger,
    SelectValue,
    SelectViewport,
    Switch,
    Textarea
  } from 'moriui'

  const searchQuery = shallowRef('')
  const compositionName = shallowRef('项目概览')
  const density = shallowRef('comfortable')
  const releaseNotifications = shallowRef(true)
  const reviewNotifications = shallowRef(true)
  const milestoneNotifications = shallowRef(false)
  const progress = shallowRef(72)

  const navigationGroups = [
    { title: '规划', items: ['组件文档', '示例库', '发布记录', '使用反馈'] },
    { title: '支持', items: ['帮助中心', '设计规范', '社区讨论', '系统状态'] },
    { title: '浏览', items: ['全部组件', '组合片段', '收藏项目'] },
    { title: '账户', items: ['个人资料', '团队方案', '外观主题'] }
  ]

  function advanceProgress() {
    progress.value = progress.value >= 100 ? 36 : progress.value + 8
  }
</script>

<template>
  <Dialog>
    <div class="min-w-0 w-full max-w-full overflow-x-auto pb-3 [contain:inline-size] min-[1650px]:[contain:none]">
      <div class="grid w-max grid-cols-[15rem_18rem_18rem_18rem_15rem] items-start gap-5">
        <div class="grid gap-5">
          <Card>
            <CardContent class="grid gap-5 p-5">
              <div class="flex flex-wrap gap-2">
                <Button size="sm">
                  新建组件 +
                </Button>
                <Button size="sm" variant="secondary">
                  次要操作
                </Button>
                <Button size="sm" variant="outline">
                  描边按钮
                </Button>
              </div>
              <Input v-model="searchQuery" aria-label="搜索组件" placeholder="搜索组件" />
              <Textarea aria-label="组件描述" placeholder="写一段用于介绍组件用途的描述…" />
              <div class="flex items-center justify-between gap-2">
                <Badge>稳定</Badge><Badge variant="secondary">
                  次要
                </Badge>
                <RadioGroup aria-label="控件状态" default-value="selected" orientation="horizontal">
                  <RadioGroupItem value="selected" aria-label="已选中" />
                  <RadioGroupItem value="unselected" aria-label="未选中" />
                </RadioGroup>
                <Checkbox :model-value="true" aria-label="已选中复选框" />
                <Switch :model-value="true" aria-label="已开启开关" />
              </div>
              <ButtonGroup>
                <Button size="sm" variant="outline">
                  确认弹窗
                </Button>
                <Button size="icon-sm" variant="outline" aria-label="展开确认弹窗">
                  ⌃
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <div class="grid grid-cols-2 gap-5">
            <Card v-for="group in navigationGroups.slice(0, 2)" :key="group.title">
              <CardContent class="grid gap-2 p-4">
                <p class="text-xs text-muted-foreground">
                  {{ group.title }}
                </p>
                <Button
                  v-for="item in group.items"
                  :key="item"
                  class="justify-start"
                  size="sm"
                  variant="ghost"
                >
                  {{ item }}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <Card v-for="group in navigationGroups.slice(2)" :key="group.title">
              <CardContent class="grid gap-2 p-4">
                <p class="text-xs text-muted-foreground">
                  {{ group.title }}
                </p>
                <Button
                  v-for="item in group.items"
                  :key="item"
                  class="justify-start"
                  size="sm"
                  variant="ghost"
                >
                  {{ item }}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div class="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>组件采用趋势</CardTitle>
              <CardDescription>最近六个月的组合使用情况。</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-5">
              <div role="img" aria-label="组件采用趋势：12月 58，1月 100，2月 82，3月 104，4月 68" class="grid h-44 grid-cols-5 items-end gap-3">
                <div
                  v-for="height in [58, 100, 82, 104, 68]"
                  :key="height"
                  class="rounded-t-lg bg-foreground/80"
                  :style="{ height: `${height}%` }"
                />
              </div>
              <div class="grid grid-cols-5 text-center text-xs text-muted-foreground">
                <span>12月</span><span>1月</span><span>2月</span><span>3月</span><span>4月</span>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-muted p-3">
                  <p class="text-xs text-muted-foreground">
                    即将发布
                  </p><p class="mt-1 font-medium">
                    5 月 2026
                  </p><p class="mt-1 text-xs text-muted-foreground">
                    已排期
                  </p>
                </div>
                <div class="rounded-xl bg-muted p-3">
                  <p class="text-xs text-muted-foreground">
                    推荐组合
                  </p><p class="mt-1 font-medium">
                    表单流
                  </p><p class="mt-1 text-xs text-muted-foreground">
                    高频使用
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button class="w-full" size="sm">
                查看完整报告
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent class="grid gap-4 p-5">
              <div>
                <p class="text-sm text-muted-foreground">
                  本月组合使用量
                </p><p class="mt-1 text-4xl font-semibold tracking-tight">
                  1,211
                </p><Badge class="mt-2" variant="secondary">
                  同步完成
                </Badge>
              </div>
              <div class="grid gap-3 rounded-xl bg-muted p-4 text-sm">
                <div class="flex justify-between">
                  <span>模板使用</span><strong>1,248</strong>
                </div><div class="border-t" /><div class="flex justify-between">
                  <span>自定义组合</span><strong>37</strong>
                </div>
              </div>
              <p class="text-sm leading-5 text-muted-foreground">
                通过组合模式，团队能更快构建稳定一致的页面。
              </p>
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-5 pt-1.5">
          <Card>
            <CardHeader><CardTitle>创建新的组合</CardTitle><CardDescription>从已有组件开始，按你的产品目标组合界面。</CardDescription></CardHeader>
            <CardContent class="grid gap-4">
              <label class="grid gap-2 text-sm font-medium">组合名称<Input v-model="compositionName" aria-label="组合名称" /></label>
              <div class="grid grid-cols-2 gap-3">
                <Select default-value="form">
                  <SelectTrigger aria-label="所属分类">
                    <SelectValue />
                  </SelectTrigger><SelectContent>
                    <SelectViewport>
                      <SelectItem value="form">
                        <SelectItemIndicator /><SelectItemText>表单</SelectItemText>
                      </SelectItem><SelectItem value="data">
                        <SelectItemIndicator /><SelectItemText>数据</SelectItemText>
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </Select>
                <RadioGroup v-model="density" aria-label="显示密度" class="grid gap-2">
                  <label class="flex items-center gap-2 text-sm"><RadioGroupItem value="comfortable" />舒适</label><label class="flex items-center gap-2 text-sm"><RadioGroupItem value="compact" />紧凑</label>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter class="grid gap-2">
              <DialogTrigger as-child>
                <Button class="w-full">
                  创建组合
                </Button>
              </DialogTrigger><Button class="w-full" variant="outline">
                取消
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader><CardTitle>发布阈值</CardTitle><CardDescription>设置组合进入团队目录前的基础要求。</CardDescription></CardHeader>
            <CardContent class="grid gap-4">
              <Select default-value="stable">
                <SelectTrigger aria-label="发布通道">
                  <SelectValue />
                </SelectTrigger><SelectContent>
                  <SelectViewport>
                    <SelectItem value="stable">
                      <SelectItemIndicator /><SelectItemText>稳定版</SelectItemText>
                    </SelectItem><SelectItem value="preview">
                      <SelectItemIndicator /><SelectItemText>预览版</SelectItemText>
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </Select>
              <Progress v-model="progress">
                <ProgressLabel>最低覆盖率</ProgressLabel><ProgressValue /><ProgressTrack><ProgressIndicator /></ProgressTrack>
              </Progress>
              <Button size="sm" variant="outline" @click="advanceProgress">
                提高覆盖率
              </Button>
              <Textarea aria-label="发布备注" placeholder="为团队成员留下这次发布的说明…" />
            </CardContent>
          </Card>
        </div>

        <div class="grid gap-5">
          <Card>
            <CardContent class="grid justify-items-center gap-4 p-6 text-center">
              <div class="grid size-32 place-items-center rounded-2xl border text-4xl" aria-label="设备预览码">
                ▦
              </div><div>
                <p class="font-medium">
                  在设备上预览
                </p><p class="mt-1 text-sm text-muted-foreground">
                  打开 Playground 后扫描此码查看当前组合。
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <Empty class="min-h-80 p-5">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  ◌
                </EmptyMedia><EmptyTitle>从一个想法开始</EmptyTitle><EmptyDescription>选择组件，拖入画布，再继续微调交互细节。</EmptyDescription>
              </EmptyHeader><EmptyContent class="w-full gap-3">
                <Textarea aria-label="会话描述" placeholder="描述你想要的界面片段…" /><Button class="w-full">
                  开始组合
                </Button>
              </EmptyContent>
            </Empty>
          </Card>
        </div>

        <div class="grid gap-5 pt-5">
          <Card>
            <Empty class="min-h-64 p-5">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  +
                </EmptyMedia><EmptyTitle>发布组合</EmptyTitle><EmptyDescription>把成熟的界面片段共享给团队，在产品中重复使用。</EmptyDescription>
              </EmptyHeader><EmptyContent><Button>发布到目录</Button></EmptyContent>
            </Empty>
          </Card>
          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-start justify-between gap-2">
                <div><CardTitle>使用分析</CardTitle><CardDescription>418.2K 次渲染</CardDescription></div><DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button size="sm" variant="outline">
                      查看数据
                    </Button>
                  </DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>分析范围</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>近 7 天</DropdownMenuItem><DropdownMenuItem>近 30 天</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent class="grid gap-3">
              <div role="img" aria-label="使用分析：近 30 天 418.2K 次渲染，较前期增长 12%" class="grid h-24 grid-cols-6 items-end gap-2 rounded-lg bg-muted p-3">
                <div
                  v-for="height in [28, 42, 36, 58, 74, 92]"
                  :key="height"
                  class="rounded-t-sm bg-foreground/75"
                  :style="{ height: `${height}%` }"
                />
              </div>
              <div class="grid gap-1 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-muted-foreground">近 30 天</span><strong>418.2K</strong>
                </div><Badge class="w-fit" variant="secondary">
                  较前期增长 12%
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>协作成员</CardTitle><CardDescription>本周参与组件组合的成员。</CardDescription></CardHeader>
            <CardContent class="grid gap-4">
              <div class="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>林</AvatarFallback>
                </Avatar><div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">
                    林默
                  </p><p class="text-xs text-muted-foreground">
                    设计系统
                  </p>
                </div><Badge variant="secondary">
                  在线
                </Badge>
              </div>
              <div class="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>周</AvatarFallback>
                </Avatar><div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">
                    周弦
                  </p><p class="text-xs text-muted-foreground">
                    前端工程
                  </p>
                </div><Badge variant="secondary">
                  活跃
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>通知</CardTitle><CardDescription>选择希望接收的团队动态。</CardDescription></CardHeader>
            <CardContent class="grid gap-4">
              <label class="flex gap-3"><Checkbox v-model="releaseNotifications" aria-label="组件发布提醒" /><span><strong class="text-sm">组件发布提醒</strong><span class="mt-1 block text-xs text-muted-foreground">新版本、修复与变更摘要。</span></span></label>
              <label class="flex gap-3"><Checkbox v-model="reviewNotifications" aria-label="设计评审" /><span><strong class="text-sm">设计评审</strong><span class="mt-1 block text-xs text-muted-foreground">有人请求审阅组合片段时提醒。</span></span></label>
              <label class="flex gap-3"><Checkbox v-model="milestoneNotifications" aria-label="目标里程碑" /><span><strong class="text-sm">目标里程碑</strong><span class="mt-1 block text-xs text-muted-foreground">在完成度达到关键节点时提醒。</span></span></label>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <DialogContent>
      <DialogHeader><DialogTitle>创建「{{ compositionName }}」</DialogTitle><DialogDescription>组合将以 {{ density === 'comfortable' ? '舒适' : '紧凑' }} 密度创建到当前工作区。</DialogDescription></DialogHeader>
    </DialogContent>
  </Dialog>
</template>
