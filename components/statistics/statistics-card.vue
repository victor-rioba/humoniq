<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div
    class="flex flex-col bg-darker border border-secondary-mid p-5 rounded-md"
  >
    <span class="text-gray font-semibold">{{ label }}</span>
    <span class="text-[32px] font-normal font-mono">{{ value }}</span>
  </div>
</template>
