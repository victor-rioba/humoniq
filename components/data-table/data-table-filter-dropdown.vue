<script setup lang="ts">
import type { OptionItem } from "~/types";

const props = defineProps<{
  options: OptionItem[];
  selectedOptions: string[];
}>();

const emit = defineEmits<{
  (e: "update:selectedOptions", selectedOptions: string[]): void;
}>();

const onSelectionChange = (value: string) => {
  if (props.selectedOptions.some((o) => o === value)) {
    emit(
      "update:selectedOptions",
      props.selectedOptions.filter((o) => o !== value)
    );
  } else {
    emit("update:selectedOptions", [...props.selectedOptions, value]);
  }
};
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <slot />
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="border-dark bg-darker min-w-64" align="start">
      <UiDropdownMenuCheckboxItem
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer hover:bg-darkest"
        :model-value="selectedOptions.some((o) => o === option.value)"
        @update:model-value="onSelectionChange(option.value)"
      >
        {{ option.label }}
      </UiDropdownMenuCheckboxItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
