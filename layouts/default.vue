<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen p-5 pr-0 flex gap-5">
    <Sidebar />
    <div class="w-full p-5 pr-10 space-y-10 overflow-scroll">
      <Header />
      <slot />
    </div>
  </div>
</template>
 