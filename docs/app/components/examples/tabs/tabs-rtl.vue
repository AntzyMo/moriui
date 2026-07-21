<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DirectionProvider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
  } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <Tabs default-value="overview" class="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">
          نظرة عامة
        </TabsTrigger>
        <TabsTrigger value="analytics">
          تحليلات
        </TabsTrigger>
        <TabsTrigger value="reports">
          تقارير
        </TabsTrigger>
        <TabsTrigger value="settings">
          إعدادات
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>نظرة عامة</CardTitle>
            <CardDescription>عرض المقاييس الرئيسية ونشاط المشروع الأخير.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>تحليلات</CardTitle>
            <CardDescription>تتبع الأداء ومقاييس تفاعل المستخدمين.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            زيادة مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>تقارير</CardTitle>
            <CardDescription>إنشاء وتنزيل التقارير التفصيلية.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            لديك ٥ تقارير جاهزة ومتاحة للتصدير.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات</CardTitle>
            <CardDescription>إدارة تفضيلات الحساب والخيارات.</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            تكوين الإشعارات والأمان والسمات.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </DirectionProvider>
</template>
