import { useState, useEffect } from "react";
import axios from "axios";
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
        const response = await axios.get(url);
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

type UserInfoTypes = [any[], boolean];

export const useUserInfo = (URL: string): UserInfoTypes => {
  const [value, setValue] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestAuth.get(URL);
        setValue(response.data);
        setPending(false);
      } catch (error) {
        setPending(false);
        console.error(error);
      }
    };
    fetchData();
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
