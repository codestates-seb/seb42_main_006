import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import YoutubeListItem from "./YoutubeListItem";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);

  overflow: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: #ff3366;
    border-radius: 1000px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    width: 30px; /*스크롤바 뒷 배경 색상*/
  }
`;

export interface Iurls {
  url: string;
  thumbnail: string;
  title: string;
}

interface YoutubeListProp {
  list: { url: string; thumbnail: string; title: string }[];
  setList: React.Dispatch<React.SetStateAction<Iurls[]>>;
}

export default function YoutubeList({ list, setList }: YoutubeListProp) {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = [...list];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setList(newItems);
  };

  return (
    <>
      <Wrapper>
        {list.length !== 0 && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {list.map((item, index) => (
                    <Draggable
                      key={item.url}
                      draggableId={item.url}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <YoutubeListItem
                            item={item}
                            key={index}
                          ></YoutubeListItem>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Wrapper>
    </>
  );
}