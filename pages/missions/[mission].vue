<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex gap-10">
    <div class="flex-1 space-y-5">
      <div
        class="rounded-lg bg-darker border border-secondary-mid p-5 flex items-center justify-between gap-2.5"
      >
        <div class="space-y-2.5">
          <h3 class="font-semibold text-gray">Status</h3>
          <p class="font-mono text-[2rem]">Success</p>
        </div>
        <Icon
          icon="icon-park-outline:success"
          class="text-other-green size-12"
        />
      </div>

      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Listen</h3>
        <AudioPlayer audio-url="/audio/ring.mp3" />
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Summary</h3>
        <p class="font-semibold leading-5">
          The user contacted United Airlines to change the date of birth on a
          reservation. The agent confirmed the reservation details, updated the
          date of birth, and offered to link the reservation with another
          passenger's reservation.
        </p>
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Transcript</h3>
      </div>
    </div>
    <div class="w-[300px] h-fit rounded-lg border border-dark p-5 space-y-5">
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Company</h3>
        <h5 class="font-semibold">Downtown Travel</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Created</h3>
        <h5 class="font-semibold">3 days ago</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Mission</h3>
        <h5 class="font-semibold">Rebook Flight</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Confirmation Number</h3>
        <h5 class="font-semibold">AGR624</h5>
      </div>
      <div class="space-y-2.5">
        <h3 class="font-semibold text-gray">Passenger Name</h3>
        <h5 class="font-semibold">Tanya McDonough</h5>
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
