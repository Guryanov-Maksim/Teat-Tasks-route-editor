const Droppable = ({ children }) => children(
  {
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  },
  {},
);

const Draggable = ({ children }) => children(
  {
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  },
  {},
);

const DragDropContext = ({ children }) => children;

export { Droppable, Draggable, DragDropContext };
