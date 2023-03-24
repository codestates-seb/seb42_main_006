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

    //요청시 AccessToken 계속 보내주기

    config.headers.Authorization = token ? token : "";

    return config;
    // Do something before request is sent
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
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
      // const access_token = sessionStorage.getItem("auth"); // 현재 만료된 access token;
      const email = sessionStorage.getItem("user");
      const refresh = sessionStorage.getItem("refresh"); // 리프레시 토큰이 있을 경우 가져온다.
      if (!!refresh === false) {
        // refresh token이 쿠키에서 삭제 또는 만료 되었을 경우
        console.log("리프레시 토큰 쿠키 삭제 또는 만료됨 ");
        // 만료 처리
      } else {
        if (!!email) {
          try {
            const emailaddr = JSON.parse(email);
            // 만료된 access token과 refresh token을 이용해 리프레시api에 갱신 요청
            const data = await request.get(`/reissue`, {
              headers: {
                RefreshToken: refresh,
                email: emailaddr["email"],
              },
            });
            if (data && originalConfig) {
              // 응답값이 있을 경우 새로 발급 받은 토큰을 저장한다.
              sessionStorage.setItem("auth", data.headers["authorization"]);
              sessionStorage.setItem("refresh", data.headers["refresh"]);
              return await requestAuth.request(originalConfig);
            }
          } catch (err) {
            // 리프레시 토큰 만료. 로그아웃 처리
            const _err = err as unknown as AxiosError;
            console.log(_err?.config?.data);
          }
        }
      }
    }
    return Promise.reject(err);
  },
);
