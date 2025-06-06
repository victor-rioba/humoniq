import { DataTableStatus, NuxtLink } from "#components";
import { Icon } from "@iconify/vue";
import { createColumnHelper } from "@tanstack/vue-table";
import type { Mission, MissionStatus } from "~/types";

const columnHelper = createColumnHelper<Mission>();

export const missionCallsTableColumns = [
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as MissionStatus;
      return h(DataTableStatus, { status });
    },
  }),

  columnHelper.accessor("created_at", {
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
      return row.getValue("created_at");
    },
  }),

  columnHelper.accessor("call_mission_display_name", {
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
      return row.getValue("call_mission_display_name");
    },
  }),

  columnHelper.accessor("traveler_name", {
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
      return row.getValue("traveler_name");
    },
  }),

  columnHelper.accessor("route", {
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
      return row.getValue("route");
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
        [
          h(
            NuxtLink,
            { to: `/missions/${row.original.id}` },
            () => "View"
          ),
        ]
      );
    },
  }),
];
