<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { FlexRender, type Table } from "@tanstack/vue-table";
import type { Mission } from "~/types";

defineProps<{
  isLoading: boolean;
  table: Table<Mission>;
}>();
</script>

<template>
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
            <UiTableCell
              :colspan="table.getAllColumns().length"
              class="h-24 py-20"
            >
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
            <UiTableCell
              :colspan="table.getAllColumns().length"
              class="h-24 text-center"
            >
              No results.
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>
