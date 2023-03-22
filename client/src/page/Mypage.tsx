import { useFetch } from "../util/MyApi";
import styled from "styled-components";
import { media } from "../style/Media";
import UserEdit from "../conponent/mypage/UserEdit";
import { useUserInfo } from "../util/MyApi";
import UserBoard from "../conponent/mypage/UserBoard";

const MypageWrap = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 4rem auto;
  color: #fff;
  ${media.pc`
      padding: 0 1.66rem;
  `}
`;

export default function Mypage() {
  const [info, infoPending] = useUserInfo(`/members/mypage`);

  let userInfo: any = {};
  userInfo = info;

  const [list, Listpending, setUrl] = useFetch(
    `/members/prf-posts?page=1&size=10`
  );

  let listData: any = [];
  listData = list;

  return (
    <>
      {userInfo && (
        <MypageWrap>
          <UserEdit userInfo={userInfo} pending={infoPending} />
          <UserBoard
            listData={listData}
            pending={Listpending}
            setUrl={setUrl}
          />
        </MypageWrap>
      )}
    </>
  );
}
