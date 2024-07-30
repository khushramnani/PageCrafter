import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 border border-gray-300 my-2 cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
