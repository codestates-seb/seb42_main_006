import axios, { InternalAxiosRequestConfig } from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

export const requestAuth = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: sessionStorage.getItem("auth"),
  },
});
// Authorization: sessionStorage.getItem("auth"),

// requestAuth.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     //요청시 AccessToken 계속 보내주기
//     if (!token) {
//       config.headers.accessToken = null;
//       config.headers.refreshToken = null;
//       return config;
//     }

//     if (config.headers && token) {
//       const { accessToken, refreshToken } = JSON.parse(token);
//       config.headers.authorization = `Bearer ${accessToken}`;
//       config.headers.refreshToken = `Bearer ${refreshToken}`;
//       return config;
//     }
//     // Do something before request is sent
//     console.log("request start", config);
//   },
//   (error) => {
//     // Do something with request error
//     console.log("request error", error);
//     return Promise.reject(error);
//   },
// );
