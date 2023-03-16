import styled from "styled-components";
import { Iurls } from "./YoutubeList";

const StyledList = styled.div`
  padding: 14px;
  border: 1px solid #4a4a4a;
  background-color: #222222;

  display: flex;
  align-items: center;

  > img {
    width: 10%;
  }
  > span {
    color: white;
    font-size: 1rem;
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
      <span>{item.title}</span>
    </StyledList>
  );
}

export default YoutubeListItem;
