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

/**
 *
 * @param data `collectPost` 함수는 `IData`라는 인터페이스를 매개변수로 받습니다.
 * @returns
 */
export const collectPost = async (data: IData) => {
  try {
    // `requestAuth`를 사용하여 POST 요청을 보내고, "/recruit-posts" 엔드포인트에 `data`를 전달합니다.
    // `await` 키워드를 사용하여 비동기적으로 응답을 기다립니다.
    const result = await requestAuth.post("/recruit-posts", data);
    // 요청이 성공한 경우, `result` 객체의 `status`를 반환합니다.
    return result.status;
  } catch (error) {
    // 요청이 실패한 경우, `error`를 콘솔에 출력합니다.
    console.log(error);
  }
};
