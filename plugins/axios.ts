import axios from "axios";
import aspida from "@aspida/axios";
import api from "~/api/$api";

export default defineNuxtPlugin(() => {
  const client = axios.create({
    baseURL: `${useRuntimeConfig().public.baseUrl}`,
    withCredentials: true,
  });

  const { logout } = useAuth();

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return logout();
      }
      return Promise.reject(error);
    }
  );

  const apiClient = api(aspida(client));

  return {
    provide: {
      api: apiClient,
    },
  };
});
