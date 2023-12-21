import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableRow = ({ index, moveRow, rowData, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ROW',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ROW',
    hover: (item) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      {React.cloneElement(children, { style: { cursor: 'move' } })}
    </div>
  );
};

export default DraggableRow;
