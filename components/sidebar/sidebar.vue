<script setup lang="ts">
const sidebarLinks = [
  {
    to: "/new",
    title: "New",
    icon: "material-symbols:add-circle-outline",
  },
  {
    to: "/missions",
    title: "Missions",
    icon: "lucide:briefcase",
  },
  {
    to: "/settings",
    title: "Settings",
    icon: "material-symbols:settings-outline-rounded",
  },
  {
    to: "/apis",
    title: "API",
    icon: "lucide:code-xml",
  },
];
</script>

<template>
  <div class="min-w-[200px] w-[200px] p-[20px] h-full rounded-md bg-darker">
    <SidebarLogo />

    <div class="flex flex-col gap-[30px] py-[30px]">
      <SidebarLink
        v-for="sidebarLink in sidebarLinks"
        :key="sidebarLink.title"
        :to="sidebarLink.to"
        :icon="sidebarLink.icon"
        :title="sidebarLink.title"
      />
    </div>
  </div>
</template>
