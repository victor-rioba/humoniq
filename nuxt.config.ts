// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",

  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/fonts"],

  fonts: {
    families: [{ name: "Inter" }, { name: "Ubuntu Sans Mono" }],
  },

  shadcn: {
    prefix: "ui",
    componentDir: "./components/ui",
  },
});
