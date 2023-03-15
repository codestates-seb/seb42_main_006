import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (
  URL: string
): [any[], boolean, React.Dispatch<React.SetStateAction<string>>] => {
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

export const userEdit = async (URL: string, item: object) => {
  try {
    const response = await axios.patch(URL, item);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const userDelete = async (URL: string) => {
  try {
    const response = await axios.delete(URL);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
