<script setup lang="ts">
  import {
    DirectionProvider,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
  } from 'moriui'
</script>

<template>
  <DirectionProvider dir="rtl">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>الملخص</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-64 gap-1 p-2">
              <li>
                <NavigationMenuLink class="flex flex-col gap-1">
                  <span class="text-sm font-medium">المقدمة</span>
                  <span class="text-xs text-muted-foreground">تعرف على المكتبة وميزاتها</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink class="flex flex-col gap-1">
                  <span class="text-sm font-medium">التثبيت</span>
                  <span class="text-xs text-muted-foreground">دليل البدء السريع</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>المكونات</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid w-56 gap-1 p-2">
              <li>
                <NavigationMenuLink class="flex flex-col gap-1">
                  <span class="text-sm font-medium">الأزرار</span>
                  <span class="text-xs text-muted-foreground">أنواع وأحجام مختلفة</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink class="flex flex-col gap-1">
                  <span class="text-sm font-medium">النماذج</span>
                  <span class="text-xs text-muted-foreground">حقول الإدخال والتحقق</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink class="text-sm font-medium">
            الوثائق
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </DirectionProvider>
</template>
