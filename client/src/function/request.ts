import axios, { AxiosError, AxiosResponse } from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

export const requestAuth = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
  headers: {
    "Content-type": "application/json",
  },
});

requestAuth.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth");

    config.headers.Authorization = token ? token : "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestAuth.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err) => {
    const _err = err as unknown as AxiosError;
    const { response } = _err;
    const originalConfig = _err?.config;

    if (response && response.status === 401) {
      const email = sessionStorage.getItem("user");
      const refresh = sessionStorage.getItem("refresh");
      if (!!refresh === false) {
        console.log("리프레시 토큰 삭제 또는 만료됨 ");
      } else {
        if (!!email) {
          try {
            const emailaddr = JSON.parse(email);
            const data = await request.get(`/reissue`, {
              headers: {
                RefreshToken: refresh,
                email: emailaddr["email"],
              },
            });
            if (data && originalConfig) {
              sessionStorage.setItem("auth", data.headers["authorization"]);
              sessionStorage.setItem("refresh", data.headers["refresh"]);
              return await requestAuth.request(originalConfig);
            }
          } catch (err) {
            const _err = err as unknown as AxiosError;
            console.log(_err?.config?.data);
          }
        }
      }
    }
    return Promise.reject(err);
  }
);
