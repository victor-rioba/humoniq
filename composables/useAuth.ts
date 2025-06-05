import type { User } from "~/types";

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);
  const isLoggedIn = computed(() => !!user.value);

  async function login(email: string, password: string) {
    try {
      await useApi().login.post({
        body: {
          email,
          password,
        },
      });
      return await fetchUser();
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function fetchUser() {
    try {
      const response = await useApi().api.user_info.$get();
      user.value = response.user;
      return user.value;
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  async function logout() {
    await useApi().logout.$get();
    user.value = null;
    clearNuxtData();
    return navigateTo({ name: "signin" });
  }

  return {
    user,
    isLoggedIn,
    login,
    fetchUser,
    logout,
  };
};
