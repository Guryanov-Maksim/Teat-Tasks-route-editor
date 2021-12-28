import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { reorderPoints, removePoint } from './features/map/mapSlice.js';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Points = () => {
  const dispatch = useDispatch();
  const { points } = useSelector((state) => state.map);
  const { t } = useTranslation();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      points,
      result.source.index,
      result.destination.index,
    );

    dispatch(reorderPoints(items));
  };

  const onClick = (e) => {
    console.log(e.target.dataset.index);
    dispatch(removePoint(e.target.dataset.index));
  };

  return (
    <>
      <h3 className="text-center">{t('points.header')}</h3>
      <div className="h-100 overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ListGroup
                variant="flush"
                {...provided.droppableProps} // eslint-disable-line
                ref={provided.innerRef}
              >
                {points.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => ( // eslint-disable-line
                      <ListGroup.Item
                        ref={provided.innerRef}
                        {...provided.draggableProps} // eslint-disable-line
                        {...provided.dragHandleProps} // eslint-disable-line
                        className="d-flex"
                      >
                        <div className="ms-2 me-auto fw-bold flex-grow-1">{item.address}</div>
                        <Button
                          className="align-self-center"
                          data-index={index}
                          key={item.id}
                          onClick={onClick}
                          variant="primary"
                        >
                          X
                        </Button>
                      </ListGroup.Item>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Points;
