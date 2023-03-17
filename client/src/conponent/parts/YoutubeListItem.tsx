import styled from "styled-components";
import { Iurls } from "./YoutubeList";

const StyledList = styled.div`
  padding: 14px;
  border: 1px solid #5a5959;
  border-left: none;
  border-right: none;
  background-color: #222222;

  display: flex;
  align-items: center;
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
      white-space: nowrap;
      text-overflow: ellipsis;
      color: white;
      font-size: 1rem;
    }
    padding: 0 10px;
  }
`;

interface ListItemProp {
  item: Iurls;
}

function YoutubeListItem({ item }: ListItemProp) {
  return (
    <StyledList>
      <img src={item.thumbnail} alt="thumbnail" />
      <div>
        <div>{item.title}</div>
      </div>
    </StyledList>
  );
}

export default YoutubeListItem;
