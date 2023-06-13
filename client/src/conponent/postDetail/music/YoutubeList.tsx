import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import YoutubeListItem from './YoutubeListItem';

import { IYoutubeInfo as Iurls } from '../../../util/PostApi';

interface YoutubeListProp {
  list: Iurls[];
  setList: (list: Iurls[]) => void;
  mode: 'read' | 'edit';
  onDelete?: (x: string) => void;
  onSelect?: (x: Iurls) => void;
}

export default function YoutubeList({ list, setList, mode, onDelete, onSelect }: YoutubeListProp) {
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
                    <Draggable key={item.url} draggableId={item.url} index={index}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <YoutubeListItem
                            item={item}
                            key={index}
                            mode={mode}
                            onDelete={onDelete}
                            onSelect={onSelect}
                          />
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

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);

  overflow: overlay;
`;
