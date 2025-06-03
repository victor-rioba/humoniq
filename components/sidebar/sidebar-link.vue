<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  to: string;
  icon: string;
  title: string;
}>();

const activeRoute = computed(() => useRoute().path);

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
  <UiButton
    :to="to"
    :as="NuxtLink"
    variant="ghost"
    class="group flex gap-2.5 p-2.5 justify-start hover:bg-darkest font-semibold"
    :class="{
      'bg-darkest border': activeRoute.startsWith(to),
      'border border-transparent': !activeRoute.startsWith(to),
    }"
  >
    <Icon :icon="icon" class="text-gray" ssr />
    {{ title }}
  </UiButton>
</template>
