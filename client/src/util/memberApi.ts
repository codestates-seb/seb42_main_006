import { requestAuth } from "../function/request";

export const emailCheckApi = async (email: string) => {
  const res = await requestAuth.post("/members/email-check", { email });
  if (res.status !== 200)
    throw new Error(res.data.message || "emailcheck error");
  return res;
};

export const signUpApi = async (data: {
  email: string;
  password: string;
  nickName: string;
}) => {
  const res = await requestAuth.post("/members/sign-up", data);
  if (res.status !== 201) throw new Error(res.data.message || "signup error");
  return res;
};

export const loginApi = async (data: {
  username: string;
  password: string;
}) => {
  const res = await requestAuth.post("/members/login", data);
  if (res.status !== 200) throw new Error(res.data.message || "login error");
  sessionStorage.setItem("auth", res.headers["authorization"]);
  sessionStorage.setItem("refresh", res.headers["refresh"]);
  sessionStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

export const logoutApi = async () => {
  const res = await requestAuth.post("/members/logout");
  if (res.status !== 200) throw new Error(res.data.message || "logout error");
  sessionStorage.clear();
  return res;
};
