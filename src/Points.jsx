import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {points.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
              {/* // <Draggable key={`item-{i}`} draggableId={item.id} index={index}> */}
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                    {item.address}
                    <Button
                      data-index={index}
                      key={item.id}
                      onClick={onClick}
                      variant="primary"
                    >
                      X
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Points;
