import axios from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
});

export const requestAuth = axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
  headers: {
    Authorization: `${sessionStorage.getItem("auth")}`,
  },
});
