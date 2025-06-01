<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex items-center gap-5">
    <div class="relative w-1/2 text-gray">
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
      >
        <Icon icon="lucide:search" class="size-4" ssr />
      </span>
      <UiInput
        placeholder="Search traveler and details"
        class="px-9 bg-darker border-none rounded-sm"
      />
      <span
        class="absolute end-0 inset-y-0 flex items-center justify-center px-3"
      >
        <Icon icon="lucide:chevron-down" class="size-5 text-gray" ssr />
      </span>
    </div>
    <UiButton
      variant="ghost"
      class="flex-1 justify-between [&_svg]:size-4 bg-darker text-gray rounded-sm"
    >
      All users

      <Icon icon="lucide:filter" ssr />
    </UiButton>
    <UiButton
      variant="ghost"
      class="flex-1 justify-between [&_svg]:size-4 bg-darker text-gray rounded-sm"
    >
      All missions

      <Icon icon="lucide:filter" ssr />
    </UiButton>
  </div>
</template>
