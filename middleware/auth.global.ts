export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name === "signin") return;

  const { isLoggedIn, user, fetchUser } = useAuth();

  if (!user.value) await fetchUser();

  if (!isLoggedIn.value) return navigateTo({ name: "signin" });
});
