import React from "react";
import styled from "styled-components";
import { Delete } from "../../../icons/Icon";
import { IYoutubeInfo as Iurls } from "../../../util/PostApi";

interface ListItemProp {
  item: Iurls;
  onDelete?: (x: string) => any;
  mode: string;
  onSelect?: (x: Iurls) => void;
}

function YoutubeListItem({ item, onDelete, mode, onSelect }: ListItemProp) {
  const selectItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onSelect && onSelect(item);
  };

  const deleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete && onDelete(item.url);
  };
  return (
    <StyledList onClick={selectItem}>
      <img src={item.thumbnail} alt="thumbnail" />
      <div>
        <div>{item.title}</div>
      </div>
      {mode === "edit" && (
        <DelBtn onClick={deleteItem}>
          <Delete></Delete>
        </DelBtn>
      )}
    </StyledList>
  );
}

export default YoutubeListItem;

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
    height: 1rem;
    > div {
      width: 100%;
      color: white;
      font-size: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    padding: 0 10px;
  }
`;

const DelBtn = styled.button`
  background-color: none;
  outline: none;
  border: none;
`;
