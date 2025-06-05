export default defineNuxtRouteMiddleware(async (to) => {
  const sessionId = useCookie("sessionId"); // only available in server-side context

  // when navigating to signin, check if sessionId exists
  if (to.name === "signin") {
    // if in server-side context and sessionId exists, redirect to missions
    if (import.meta.server && sessionId.value) {
      return navigateTo({ name: "missions" });
    }

    // continue to signin page
    return;
  }

  // if in server-side context, check for sessionId cookie
  if (import.meta.server && !sessionId.value) {
    return navigateTo({ name: "signin" });
  }

  const { isLoggedIn, user, fetchUser } = useAuth();

  // if user is not logged in, fetch user data
  if (!user.value) await fetchUser();

  if (!isLoggedIn.value) return navigateTo({ name: "signin" });
});
