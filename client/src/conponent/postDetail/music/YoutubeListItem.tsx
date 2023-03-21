import styled from "styled-components";
import { Delete } from "../../../icons/Icon";
import { Iurls } from "../../../page/AddPost";

const StyledList = styled.div`
  padding: 14px;
  border: 1px solid #5a5959;
  border-left: none;
  border-right: none;
  background-color: #222222;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  overflow: hidden;

  > img {
    width: 10%;
  }
  > div {
    width: 80%;
    overflow: hidden;
    > div {
      width: 100%;
      /* white-space: nowrap;
      text-overflow: ellipsis; */
      color: white;
      font-size: 1rem;
    }
    padding: 0 10px;
  }
`;

const DelBtn = styled.button`
  background-color: none;
  outline: none;
  border: none;
`;

interface ListItemProp {
  item: Iurls;
  onDelete?: (x: string) => any;
  mode: string;
}

function YoutubeListItem({ item, onDelete, mode }: ListItemProp) {
  return (
    <StyledList>
      <img src={item.thumbnail} alt="thumbnail" />
      <div>
        <div>{item.title}</div>
      </div>
      {mode === "edit" && (
        <DelBtn onClick={() => onDelete && onDelete(item.url)}>
          <Delete></Delete>
        </DelBtn>
      )}
    </StyledList>
  );
}

export default YoutubeListItem;
