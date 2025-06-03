<script setup lang="ts">
import WaveSurfer from "wavesurfer.js";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  audioUrl: string;
}>();

const waveform = ref();
const waveSurfer = ref<WaveSurfer>();

const currentPlayingTime = ref();

const totalDuration = ref();

const isPlaying = ref(false);

const togglePlay = () => {
  if (waveSurfer.value) {
    waveSurfer.value.playPause();
    isPlaying.value = waveSurfer.value.isPlaying();
  }
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
};

onMounted(() => {
  if (!waveform.value) return;

  waveSurfer.value = WaveSurfer.create({
    container: waveform.value,
    waveColor: "#737384",
    progressColor: "#EB94EB",
    url: props.audioUrl,
    height: 100,
    barGap: 2,
    barRadius: 8,
    barHeight: 2,
    barWidth: 4,
  });

  waveSurfer.value.on("play", () => (isPlaying.value = true));
  waveSurfer.value.on("pause", () => (isPlaying.value = false));

  waveSurfer.value.on("ready", () => {
    const duration = waveSurfer.value?.getDuration()!;
    totalDuration.value = formatTime(duration);
    currentPlayingTime.value = formatTime(0);
  });
  waveSurfer.value.on("audioprocess", (currentTime) => {
    currentPlayingTime.value = formatTime(currentTime);
  });
  waveSurfer.value.on("finish", () => {
    isPlaying.value = false;
    waveSurfer.value?.seekTo(0);
    currentPlayingTime.value = formatTime(0);
  });
});

onUnmounted(() => {
  waveSurfer.value?.destroy();
});
</script>

<template>
  <div ref="waveform"></div>
  <div class="flex items-center justify-between gap-2.5">
    <UiButton
      variant="ghost"
      class="p-0 rounded-full [&_svg]:size-8 hover:text-primary"
      @click="togglePlay"
    >
      <Icon v-if="isPlaying" icon="solar:pause-circle-outline" />
      <Icon v-else icon="solar:play-circle-outline" />
    </UiButton>
    <div v-if="currentPlayingTime && totalDuration">
      {{ currentPlayingTime }} / {{ totalDuration }}
    </div>
  </div>
</template>
