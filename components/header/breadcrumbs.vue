<script setup lang="ts">
import { Icon } from "@iconify/vue";

const allBreadcrumbs = {
  "/missions": [
    { title: "Missions", to: "/missions" },
    { title: "All", to: "/missions" },
  ],
};

const activeRoute = computed(() => useRoute().path);

const breadcrumbs = computed(() => {
  return allBreadcrumbs[activeRoute.value as keyof typeof allBreadcrumbs];
});
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <div
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.title"
        class="contents"
      >
        <UiBreadcrumbItem>
          <UiBreadcrumbLink as-child>
            <NuxtLink :to="breadcrumb.to" class="font-semibold text-[16px]">
              {{ breadcrumb.title }}
            </NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator v-if="index !== breadcrumbs.length - 1">
          <Icon
            icon="material-symbols-light:arrow-forward-ios-rounded"
            class="text-gray size-3.5"
          />
        </UiBreadcrumbSeparator>
      </div>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
