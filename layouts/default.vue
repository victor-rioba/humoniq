<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen p-[20px] flex gap-[20px]">
    <Sidebar />
    <div class="w-full p-[20px] space-y-10">
      <Header />
      <slot />
    </div>
  </div>
</template>
