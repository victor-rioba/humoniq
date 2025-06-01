<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { MissionStatus } from "~/types";

const props = defineProps<{
  status: MissionStatus;
}>();

const statusIcon = computed(
  () =>
    ({
      [MissionStatus.Attention]: "ph:shield-warning-light",
      [MissionStatus.Working]: "ph:hourglass-medium",
      [MissionStatus.Success]: "icon-park-outline:success",
    }[props.status])
);
</script>

<template>
  <div class="flex items-center gap-2.5">
    <Icon
      :icon="statusIcon"
      class="size-6"
      :class="{
        'text-other-gold': status === MissionStatus.Working,
        'text-other-red': status === MissionStatus.Attention,
        'text-other-green': status === MissionStatus.Success,
      }"
    />

    {{ status }}
  </div>
</template>
