import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { reorderPoints, removePoint, selectPoints } from '../features/map/mapSlice.js';

const Points = () => {
  const dispatch = useDispatch();
  const points = useSelector(selectPoints);
  const { t } = useTranslation();

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    const payload = {
      points,
      startIndex: source.index,
      endIndex: destination.index,
    };

    dispatch(reorderPoints(payload));
  };

  const onClick = (e) => dispatch(removePoint(e.target.dataset.index));

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
