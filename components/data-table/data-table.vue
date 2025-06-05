<script setup lang="ts">
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { DataTableStatus } from "#components";
import { MissionStatus, type Mission } from "~/types";
import { Icon } from "@iconify/vue";

const NuxtLink = resolveComponent("NuxtLink");

const isLoading = ref(false);

async function fetchMissions() {
  await useApi().api.missions_list.$get();
}

onMounted(() => fetchMissions());

// fetch from API
const allMissions: Mission[] = [
  {
    status: MissionStatus.Working,
    createdAt: "13 mins ago",
    mission: "Rebook Flight",
    traveler: "Sandy Williams",
    details: "LAX-CDG",
  },
  {
    status: MissionStatus.Attention,
    createdAt: "4 hours ago",
    mission: "UM Service",
    traveler: "Jakob Foley",
    details: "BOS-SVQ",
  },
  {
    status: MissionStatus.Success,
    createdAt: "3 days ago",
    mission: "Rebook Flight",
    traveler: "Tanya McDonough",
    details: "JFK-SVQ",
  },
  {
    status: MissionStatus.Success,
    createdAt: "3 days ago",
    mission: "Rebook Flight",
    traveler: "Daniela Delascurain",
    details: "BOI-CPT",
  },
  {
    status: MissionStatus.Success,
    createdAt: "4 days ago",
    mission: "Cancel Hotel",
    traveler: "Caleb Moore",
    details: "Berlin, DE",
  },
  {
    status: MissionStatus.Success,
    createdAt: "7 days ago",
    mission: "Rebook Flight",
    traveler: "Tallulah McAuslan",
    details: "EWR-AMS",
  },
  {
    status: MissionStatus.Success,
    createdAt: "8 days ago",
    mission: "Rebook Flight",
    traveler: "Jack Garland",
    details: "EWR-AMS",
  },
  {
    status: MissionStatus.Success,
    createdAt: "8 days ago",
    mission: "Rebook Flight",
    traveler: "Jack Garland",
    details: "EWR-AMS",
  },
  {
    status: MissionStatus.Success,
    createdAt: "8 days ago",
    mission: "Rebook Flight",
    traveler: "Cassandra Forestal",
    details: "LHR-MAD",
  },
  {
    status: MissionStatus.Success,
    createdAt: "10 days ago",
    mission: "Rebook Hotel",
    traveler: "Keith Hughes",
    details: "Paris, FR",
  },
  {
    status: MissionStatus.Success,
    createdAt: "10 days ago",
    mission: "Cancel Hotel",
    traveler: "Sebastian Gomez",
    details: "Madrid, ES",
  },
];

const searchQuery = ref("");

const usersFilterOptions = computed(() => {
  const uniqueTravelers = new Set(
    allMissions.map((mission) => mission.traveler)
  );

  return Array.from(uniqueTravelers).map((traveler) => ({
    label: traveler,
    value: traveler,
  }));
});

const missionsFilterOptions = computed(() => {
  const uniqueMissions = new Set(allMissions.map((mission) => mission.mission));
  return Array.from(uniqueMissions).map((mission) => ({
    label: mission,
    value: mission,
  }));
});

const selectedUsers = ref<string[]>([]);
const selectedMissions = ref<string[]>([]);

const missions = computed(() => {
  return allMissions.filter((mission) => {
    const matchesUserFilter =
      !selectedUsers.value.length ||
      selectedUsers.value.includes(mission.traveler);

    const matchesMissionFilter =
      !selectedMissions.value.length ||
      selectedMissions.value.includes(mission.mission);

    return matchesUserFilter && matchesMissionFilter;
  });
});

const columnHelper = createColumnHelper<Mission>();

const columns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as MissionStatus;
      return h(DataTableStatus, { status });
    },
  }),

  columnHelper.accessor("createdAt", {
    enableSorting: true,
    header: ({ column }) => {
      return h(
        "button",
        {
          class: "flex items-center gap-1",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        ["Created", h(Icon, { icon: "carbon:chevron-sort", class: "size-4" })]
      );
    },
    cell: ({ row }) => {
      return row.getValue("createdAt");
    },
  }),

  columnHelper.accessor("mission", {
    enableSorting: true,
    header: ({ column }) => {
      return h(
        "button",
        {
          class: "flex items-center gap-1",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        ["Mission", h(Icon, { icon: "carbon:chevron-sort", class: "size-4" })]
      );
    },
    cell: ({ row }) => {
      return row.getValue("mission");
    },
  }),

  columnHelper.accessor("traveler", {
    enableSorting: true,
    header: ({ column }) => {
      return h(
        "button",
        {
          class: "flex items-center gap-1",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        ["Traveler", h(Icon, { icon: "carbon:chevron-sort", class: "size-4" })]
      );
    },
    cell: ({ row }) => {
      return row.getValue("traveler");
    },
  }),

  columnHelper.accessor("details", {
    enableSorting: true,
    header: ({ column }) => {
      return h(
        "button",
        {
          class: "flex items-center gap-1",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        ["Details", h(Icon, { icon: "carbon:chevron-sort", class: "size-4" })]
      );
    },
    cell: ({ row }) => {
      return row.getValue("details");
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return h(
        "div",
        {
          class: "text-right text-primary font-semibold cursor-pointer",
        },
        [h(NuxtLink, { to: `/missions/${row.original.mission}` }, () => "View")]
      );
    },
  }),
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const table = useVueTable({
  manualPagination: true,
  get data() {
    return missions.value;
  },
  columns,
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
</script>

<template>
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

    <div class="w-full py-4">
      <div class="rounded-md border border-dark">
        <UiTable>
          <UiTableHeader>
            <UiTableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
              class="border-dark text-gray"
            >
              <UiTableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
                class="first:pl-5 last:pr-5 py-2.5 font-semibold leading-none"
                :class="{
                  'text-right': header.id === 'actions',
                }"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-if="isLoading" class="border-transparent">
              <UiTableCell :colspan="columns.length" class="h-24">
                <Icon
                  icon="lucide:loader-circle"
                  class="text-muted animate-spin size-12 mx-auto"
                />
              </UiTableCell>
            </UiTableRow>

            <template v-else-if="table.getRowModel().rows?.length">
              <UiTableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
                class="border-transparent font-normal group"
              >
                <UiTableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="first:pl-5 last:pr-5 pt-5 pb-2.5 group-last:pb-5"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </UiTableCell>
              </UiTableRow>
            </template>

            <UiTableRow v-else class="border-transparent">
              <UiTableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </div>
  </div>
</template>
