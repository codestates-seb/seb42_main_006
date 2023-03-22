import { useState, useEffect } from "react";
import { requestAuth } from "../function/request";

type UserFetchTypes = [
  any[],
  boolean,
  React.Dispatch<React.SetStateAction<string>>
];

export const useFetch = (URL: string): UserFetchTypes => {
  const [url, setUrl] = useState(URL);
  const [value, setValue] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAuth.get(url);
        setValue(response.data);
        setPending(false);
      } catch (error) {
        setPending(false);
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  return [value, pending, setUrl];
};

type UserInfoReturnTypes = [any[], boolean];

export interface UserInfoItemTypes {
  createdAt: string;
  email: string;
  id: number;
  memberStatus: string;
  modifiedAt: string;
  nickName: string;
}

export const useUserInfo = (URL: string): UserInfoReturnTypes => {
  const [pending, setPending] = useState<boolean>(true);
  const [value, setValue] = useState<[] | UserInfoItemTypes[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<UserInfoItemTypes[]> => {
      try {
        const response = await requestAuth.get(URL);
        setPending(false);
        return response.data;
      } catch (error) {
        setPending(false);
        console.error(error);
        console.log("돌아가기!");
        return [];
      }
    };
    fetchData().then((data) => setValue(data));
  }, [URL]);

  return [value, pending];
};

export const userEdit = async (URL: string, item: object) => {
  try {
    const response = await requestAuth.patch(URL, item);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const userDelete = async (URL: string) => {
  try {
    const response = await requestAuth.delete(URL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
