<script setup lang="ts">
import { Icon } from "@iconify/vue";

import type { OptionItem } from "~/types";

defineProps<{
  modelValue?: string;
  placeholder: string;
  options: OptionItem[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="w-full p-5 justify-between [&_svg]:size-5 bg-darker text-gray font-normal rounded-sm"
      >
        {{ placeholder }}
        <Icon icon="lucide:chevron-down" ssr />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="border-dark bg-darker min-w-64" align="start">
      <UiDropdownMenuItem
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer hover:bg-darkest px-4"
        @click="emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
