<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { user, logout } = useAuth();
</script>

<template>
  <div class="text-gray flex items-center gap-2.5" @click="logout">
    Hi {{ user?.name || "Guest" }}
    <Icon icon="ph:hourglass-medium" class="size-6 text-other-gold" ssr />
  </div>
</template>
