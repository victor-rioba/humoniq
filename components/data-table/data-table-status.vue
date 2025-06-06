<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { MissionStatus } from "~/types";

const props = defineProps<{
  status: MissionStatus;
}>();

const statusIcon = computed(
  () =>
    ({
      [MissionStatus.Failure]: "ph:shield-warning-light",
      [MissionStatus.FailedTwimlGen]: "ph:shield-warning-light",
      [MissionStatus.FailedBrigeConn]: "ph:shield-warning-light",
      [MissionStatus.FailedInitiation]: "ph:shield-warning-light",
      [MissionStatus.Unknown]: "ph:shield-warning-light",
      [MissionStatus.Canceled]: "ph:shield-warning-light",
      [MissionStatus.CanceledByUser]: "ph:shield-warning-light",
      [MissionStatus.Initiating]: "ph:hourglass-medium",
      [MissionStatus.Success]: "icon-park-outline:success",
      [MissionStatus.Completed]: "icon-park-outline:success",
    }[props.status])
);
</script>

<template>
  <div class="flex items-center gap-2.5">
    <Icon
      :icon="statusIcon"
      class="size-6"
      :class="{
        'text-other-red':
          status === MissionStatus.Failure ||
          status === MissionStatus.FailedTwimlGen ||
          status === MissionStatus.FailedBrigeConn ||
          status === MissionStatus.FailedInitiation ||
          status === MissionStatus.Unknown ||
          status === MissionStatus.Canceled ||
          status === MissionStatus.CanceledByUser,
        'text-other-gold': status === MissionStatus.Initiating,
        'text-other-green':
          status === MissionStatus.Success ||
          status === MissionStatus.Completed,
      }"
      ssr
    />

    {{ status }}
  </div>
</template>
