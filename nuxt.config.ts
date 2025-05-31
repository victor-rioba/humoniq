// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",

  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],

  css: ["~/assets/css/inter.css", "~/assets/css/font.css"],
});
