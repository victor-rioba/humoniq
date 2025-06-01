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
      'bg-darkest border': to === activeRoute,
      'border border-transparent': to !== activeRoute,
    }"
  >
    <Icon :icon="icon" class="text-gray" ssr />
    {{ title }}
  </UiButton>
</template>
