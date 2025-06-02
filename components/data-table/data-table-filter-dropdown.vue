<script setup lang="ts">
import type { OptionItem } from "~/types";

const props = defineProps<{
  options: OptionItem[];
  selectedOptions: string[];
}>();

const emit = defineEmits<{
  (e: "update:selectedOptions", selectedOptions: (string | number)[]): void;
}>();

const onSelectionChange = (value: string | number) => {
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
      <div ref="triggerRef" class="flex-1">
        <slot />
      </div>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="border-0 bg-darker min-w-64" align="start">
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
