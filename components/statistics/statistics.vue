<script setup lang="ts">
const statistics = [
  { label: "Mission Count", value: "274" },
  { label: "Mission Success", value: "93.5%" },
  { label: "Mission Savings", value: "$5,480" },
];
</script>

<template>
  <div class="flex gap-5">
    <StatisticsCard
      v-for="statistic in statistics"
      :key="statistic.label"
      :label="statistic.label"
      :value="statistic.value"
      class="w-1/3"
    />
  </div>
</template>
