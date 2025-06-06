<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  MissionStatus,
  type DetailedMission,
  type TranscriptMessage,
} from "~/types";

const missionId = computed(() => {
  return useRoute().params.mission as string;
});

const mission = ref<DetailedMission>();

const parsedCustomPrompt = computed(() => {
  if (!mission.value?.custom_prompt) return null;
  try {
    return JSON.parse(mission.value.custom_prompt);
  } catch {
    return null;
  }
});

const parsedProcessedJson = computed(() => {
  if (!mission.value?.processed_json) return null;
  try {
    // Most are clean, but sometimes you need to clean
    let raw = mission.value.processed_json;
    // Find only the JSON block if the field is messy
    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      raw = raw.substring(firstBrace, lastBrace + 1);
      return cleanAndParseJson(raw);
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
});

const processedJsonExtraText = computed(() => {
  // Get any text after the JSON block + "---"
  if (!mission.value?.processed_json) return null;
  const raw = mission.value.processed_json;
  const lastBraceIndex = raw.lastIndexOf("}");
  if (lastBraceIndex === -1) return null;
  const textAfter = raw.substring(lastBraceIndex + 1);
  const separatorIdx = textAfter.indexOf("---");
  if (separatorIdx !== -1) {
    let extra = textAfter.substring(separatorIdx + 3).trim();
    extra = extra.replace(/\\n/g, "\n");
    extra = extra.replace(/^"|"$/g, "");
    return extra || null;
  }
  return null;
});

const parsedTranscript = computed<TranscriptMessage[]>(() => {
  if (!mission.value?.call_transcript) return [];
  try {
    return typeof mission.value.call_transcript === "string"
      ? JSON.parse(mission.value.call_transcript)
      : mission.value.call_transcript;
  } catch {
    return [];
  }
});

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
    }[mission.value?.status || MissionStatus.Initiating])
);

async function fetchMissionDetails() {
  mission.value = await useApi().api.mission._missionId(missionId.value).$get();
}

fetchMissionDetails();
</script>

<template>
  <div class="flex gap-10">
    <div class="flex-1 space-y-5">
      <div
        class="rounded-lg bg-darker border border-secondary-mid p-5 flex items-center justify-between gap-2.5"
      >
        <div class="space-y-2.5">
          <h3 class="font-semibold text-gray">Status</h3>
          <p class="font-mono text-[2rem]">{{ mission?.status }}</p>
        </div>

        <Icon
          :icon="statusIcon"
          class="size-12"
          :class="{
            'text-other-red':
              mission?.status === MissionStatus.Failure ||
              mission?.status === MissionStatus.FailedTwimlGen ||
              mission?.status === MissionStatus.FailedBrigeConn ||
              mission?.status === MissionStatus.FailedInitiation ||
              mission?.status === MissionStatus.Unknown ||
              mission?.status === MissionStatus.Canceled ||
              mission?.status === MissionStatus.CanceledByUser,
            'text-other-gold': mission?.status === MissionStatus.Initiating,
            'text-other-green':
              mission?.status === MissionStatus.Success ||
              mission?.status === MissionStatus.Completed,
          }"
          ssr
        />
      </div>

      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Listen</h3>
        <AudioPlayer audio-url="/audio/ring.mp3" />
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Summary</h3>
        <p class="font-semibold leading-5">
          {{ mission?.call_evaluation }}
        </p>
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Transcript</h3>

        <div class="flex items-center justify-between font-semibold">
          <span class="py-2.5 flex items-center gap-2.5 text-secondary">
            <Icon icon="ic:baseline-flight" class="size-4 text-muted" ssr />
            Airline
          </span>
          <span class="py-2.5 flex items-center gap-2.5 text-primary">
            Humoniq
            <img src="~/assets/img/logo-icon.svg" class="w-4" />
          </span>
        </div>

        <div v-if="parsedTranscript.length" class="flex flex-col space-y-5">
          <div
            v-for="(entry, i) in parsedTranscript.filter(
              (entry) => entry.message
            )"
            :key="i"
            class="w-fit bg-darker p-2.5 max-w-[60%]"
            :class="{
              'border-l border-l-secondary rounded-r-sm': entry.role === 'user',
              'self-end border-r border-r-primary rounded-l-sm':
                entry.role === 'agent',
            }"
          >
            <span>{{ entry.message }}</span>
          </div>
        </div>
        <div v-else class="text-gray-400 italic">No transcript available</div>
      </div>
    </div>
    <div class="w-[300px] h-fit rounded-lg border border-dark p-5 space-y-5">
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Company</h3>
        <h5 class="font-semibold">{{ mission?.airline }}</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Created</h3>
        <h5 class="font-semibold">{{ mission?.created_at }}</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Mission</h3>
        <h5 class="font-semibold">{{ mission?.call_mission }}</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Confirmation Number</h3>
        <h5 class="font-semibold">AGR624</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Passenger Name</h3>
        <h5 class="font-semibold">{{ mission?.traveler_name }}</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Credit Card</h3>
        <h5 class="font-semibold">xxxx xxxx xxxx 5004</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Data</h3>
        <div>
          <h5 class="font-semibold">Ideal Date: 13 July 2025</h5>
          <h5 class="font-semibold">Ideal Time: Morning</h5>
          <h5 class="font-semibold">Maximum Cost: $200</h5>
        </div>
      </div>

      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Actions</h3>
        <div class="flex flex-col gap-[5px] font-semibold text-primary">
          <span>Share</span>
          <span>Duplicate</span>
        </div>
      </div>
    </div>
  </div>
</template>
