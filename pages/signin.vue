<script setup lang="ts">
definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
</script>

<template>
  <div class="w-screen h-screen flex justify-center pt-[100px]">
    <div
      class="h-min w-[400px] rounded-lg border border-dark flex flex-col items-center p-10 gap-5"
    >
      <img src="~/assets/img/logo-vertical.svg" class="w-[98px]" />
      <UiInput
        v-model="email"
        type="email"
        placeholder="Email"
        class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
      />
      <UiInput
        v-model="password"
        type="password"
        placeholder="Password"
        class="h-full p-5 bg-darker border-none rounded-sm placeholder:text-gray"
      />
      <UiButton class="w-full bg-primary-mid hover:bg-primary p-5 rounded-sm">
        Sign In
      </UiButton>
    </div>
  </div>
</template>
