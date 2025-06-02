<script setup lang="ts">
import { MissionType, NotificationType } from "~/types";

const missionTypeOptions = [
  MissionType.Flight,
  MissionType.Hotel,
  MissionType.Car,
];

const notificationTypeOptions = [
  NotificationType.Email,
  NotificationType.Text,
  NotificationType.None,
];

const missionOptions = [
  "Rebook Flight",
  "Rebook Hotel",
  "Cancel Hotel",
  "UM Service",
].map((option) => ({
  label: option,
  value: option,
}));

const airlineOptions = [
  "American Airlines",
  "Delta Airlines",
  "United Airlines",
  "Southwest Airlines",
].map((option) => ({
  label: option,
  value: option,
}));
</script>

<template>
  <div class="flex gap-10">
    <div class="flex-1 space-y-5">
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <h3 class="font-semibold text-gray">Mission</h3>
        <UiRadioGroup :default-value="MissionType.Flight" class="flex gap-10">
          <div
            class="flex items-center gap-2.5"
            v-for="option in missionTypeOptions"
            :key="option"
          >
            <UiRadioGroupItem :id="option" :value="option" />
            <UiLabel :for="option" class="font-semibold">{{ option }}</UiLabel>
          </div>
        </UiRadioGroup>
        <FormSelect placeholder="Select a mission" :options="missionOptions" />
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-gray">Booking</h3>
          <span class="font-semibold text-primary">Fetch</span>
        </div>

        <div class="flex gap-5">
          <FormSelect
            placeholder="Select an airline"
            :options="airlineOptions"
          />
          <UiInput
            placeholder="Confirmation number"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
        </div>
      </div>
      <div class="rounded-lg border border-dark p-5 space-y-5">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-gray">Traveler</h3>
          <span class="font-semibold text-primary">Add</span>
        </div>
        <div class="flex gap-5">
          <UiInput
            placeholder="First name"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
          <UiInput
            placeholder="Middle name"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
          <UiInput
            placeholder="Last name"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
        </div>
        <div class="flex gap-5">
          <UiInput
            placeholder="Date of birth"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
          <UiInput
            placeholder="Gender"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
        </div>
        <div class="flex gap-5">
          <UiInput
            placeholder="Email address"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
          <UiInput
            placeholder="Phone number"
            class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
          />
        </div>
        <UiInput
          placeholder="eTicket number (optional)"
          class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
        />
      </div>
    </div>
    <div class="w-[300px] h-fit rounded-lg border border-dark p-5 space-y-10">
      <div class="space-y-5">
        <h3 class="font-semibold text-gray">Company</h3>
        <h5 class="font-semibold">Downtown Travel</h5>
      </div>

      <div class="space-y-5">
        <h3 class="font-semibold text-gray">Options</h3>
        <div class="flex items-center gap-2.5">
          <UiCheckbox id="high-priority" /> High Priority
        </div>
        <div class="flex items-center gap-2.5">
          <UiCheckbox id="human-backup" /> Human Backup
        </div>
        <div class="flex items-center gap-2.5">
          <UiCheckbox id="premium-line" /> Premium Line
        </div>
      </div>

      <div class="space-y-5">
        <h3 class="font-semibold text-gray">Notitication</h3>
        <UiRadioGroup :default-value="NotificationType.Email" class="gap-10">
          <div
            class="flex items-center gap-2.5"
            v-for="option in notificationTypeOptions"
            :key="option"
          >
            <UiRadioGroupItem :id="option" :value="option" />
            <UiLabel :for="option" class="font-semibold">{{ option }}</UiLabel>
          </div>
        </UiRadioGroup>
        <UiInput
          placeholder="Email address"
          class="bg-darker border-none rounded-sm placeholder:text-gray"
        />
      </div>

      <div class="space-y-5">
        <h3 class="font-semibold text-gray">Advanced</h3>
        <div class="flex flex-col gap-[5px] font-semibold text-primary">
          <span>Deep Link</span>
          <span>Bulk Upload</span>
          <span>API Docs</span>
        </div>
      </div>
    </div>
  </div>
</template>
