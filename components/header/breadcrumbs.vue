<script setup lang="ts">
import { Icon } from "@iconify/vue";

const route = useRoute();

const activeRouteName = computed(() => route.name);

const allBreadcrumbs = computed(() => {
  return {
    missions: [
      {
        title: "Missions",
        to: {
          name: "missions",
        },
      },
      {
        title: "All",
        to: {
          name: "missions",
        },
      },
    ],
    new: [
      {
        title: "Missions",
        to: {
          name: "missions",
        },
      },

      {
        title: "New",
        to: {
          name: "new",
        },
      },
    ],
    "missions-mission": [
      {
        title: "Missions",
        to: {
          name: "missions",
        },
      },
      { title: route.params.mission as string, to: route },
    ],
  };
});

const breadcrumbs = computed(() => {
  return allBreadcrumbs.value[
    activeRouteName.value as keyof typeof allBreadcrumbs.value
  ];
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
            ssr
          />
        </UiBreadcrumbSeparator>
      </div>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
