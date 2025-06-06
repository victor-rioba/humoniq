<script setup lang="ts">
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { MissionStatus, type Mission } from "~/types";
import { Icon } from "@iconify/vue";
import { missionCallsTableColumns } from "~/components/data-table/missions-calls";

const missions = ref<Mission[]>([]);
const isLoading = ref(true);

const searchQuery = ref("");

const selectedUsers = ref<string[]>([]);
const selectedMissions = ref<string[]>([]);

const usersFilterOptions = computed(() => {
  const uniqueTravelers = new Set(
    missions.value.map((mission) => mission.traveler_name)
  );

  return Array.from(uniqueTravelers).map((traveler) => ({
    label: traveler,
    value: traveler,
  }));
});

const missionsFilterOptions = computed(() => {
  const uniqueMissions = new Set(
    missions.value.map((mission) => mission.call_mission_display_name)
  );
  return Array.from(uniqueMissions).map((mission) => ({
    label: mission,
    value: mission,
  }));
});

const filteredMissions = computed(() => {
  return missions.value.filter((mission) => {
    const matchesUserFilter =
      !selectedUsers.value.length ||
      selectedUsers.value.includes(mission.traveler_name);

    const matchesMissionFilter =
      !selectedMissions.value.length ||
      selectedMissions.value.includes(mission.call_mission_display_name);

    const q = searchQuery.value.toLowerCase();
    const matchesSearchQuery =
      !q ||
      [
        mission.call_mission,
        mission.traveler_name,
        mission.route,
        mission.airline,
        mission.status,
        mission.api_key_name,
      ]
        .map((v) => (v ?? "").toLowerCase())
        .some((field) => field.includes(q));

    return matchesSearchQuery && matchesUserFilter && matchesMissionFilter;
  });
});

const badges = computed(() => {
  const missionsList = filteredMissions.value;
  const totalCalls = missionsList.length;
  let totalDuration = 0;
  let successfulCalls = 0;

  for (const m of missionsList) {
    totalDuration += m.call_duration ?? 0;
    if (
      m.status &&
      (m.status.includes("success") ||
        m.status === MissionStatus.Completed ||
        m.status.includes("evaluated_success"))
    ) {
      successfulCalls++;
    }
  }

  const totalMinutes = Math.floor(totalDuration / 60);
  const successRate =
    totalCalls > 0 ? Math.round((successfulCalls / totalCalls) * 100) : 0;
  const avgDuration =
    totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;

  return {
    totalCalls,
    totalMinutes,
    successRate,
    avgDuration: formatDuration(avgDuration),
  };
});

const statistics = computed(() => [
  {
    label: "Call Count",
    value: badges.value.totalCalls.toString(),
  },
  {
    label: "Call Minutes",
    value: badges.value.totalMinutes.toString(),
  },
  {
    label: "Success Rate",
    value: `${badges.value.successRate}%`,
  },
  {
    label: "Avg. Call Duration",
    value: badges.value.avgDuration,
  },
]);

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
  manualPagination: true,
  get data() {
    return filteredMissions.value;
  },
  columns: missionCallsTableColumns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});

async function fetchMissionsList() {
  try {
    missions.value = await useApi().api.missions_list.$get();
  } finally {
    isLoading.value = false;
  }
}

fetchMissionsList();
</script>

<template>
  <div class="space-y-10">
    <div class="flex gap-5">
      <StatisticsCard
        v-for="statistic in statistics"
        :key="statistic.label"
        :label="statistic.label"
        :value="statistic.value"
        class="w-1/3"
      />
    </div>
    <div class="space-y-5">
      <div class="flex items-center gap-5">
        <div class="relative w-1/2 text-gray">
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
          >
            <Icon icon="lucide:search" class="size-4" ssr />
          </span>
          <UiInput
            v-model="searchQuery"
            placeholder="Search traveler and details"
            class="pl-9 bg-darker border-none rounded-sm placeholder:text-gray"
          />
        </div>
        <DataTableFilterDropdown
          :options="usersFilterOptions"
          v-model:selected-options="selectedUsers"
        >
          <UiButton
            variant="ghost"
            class="flex-1 justify-between [&_svg]:size-4 bg-darker text-gray font-normal rounded-sm"
          >
            All users
            <Icon icon="lucide:filter" ssr />
          </UiButton>
        </DataTableFilterDropdown>
        <DataTableFilterDropdown
          :options="missionsFilterOptions"
          v-model:selected-options="selectedMissions"
        >
          <UiButton
            variant="ghost"
            class="flex-1 justify-between [&_svg]:size-4 bg-darker text-gray font-normal rounded-sm"
          >
            All missions
            <Icon icon="lucide:filter" ssr />
          </UiButton>
        </DataTableFilterDropdown>
      </div>

      <DataTable :is-loading="isLoading" :table="table" />
    </div>
  </div>
</template>
