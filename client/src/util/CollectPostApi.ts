import { requestAuth } from "../function/request";

export interface IData {
  prfPostId: number;
  title: string;
  category: string;
  content: string;
  recruitNumber: number;
  dueDate: string;
  age: string;
  tags: string;
}

export const collectPost = async (data: IData) => {
  try {
    const result = await requestAuth.post("/recruit-posts", data);
    return result.status;
  } catch (error) {
    console.log(error);
  }
};
