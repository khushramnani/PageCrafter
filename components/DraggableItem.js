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
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', padding: '10px', border: '1px solid #ccc', margin: '10px 0' }}>
      {children}
    </div>
  );
};

export default DraggableItem;
