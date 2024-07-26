"use client";
import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import Nav from "@/components/Nav";
import FormComponent from '@/components/FormComponent';
import Image from 'next/image';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  NAVBAR: 'navbar',
  FORM: 'form',
  IMAGE: 'image',
};

const DragArea = ({ components, setComponents, onComponentSelect }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const ref = useRef(null);

  const moveElement = (index, item) => {
    const newComponents = [...components];
    newComponents.splice(index, 0, { ...item, width: '100%', height: 'auto' });
    setComponents(newComponents);
  };

  const [{ isOver, clientOffset }, drop] = useDrop({
    accept: [ItemTypes.NAVBAR, ItemTypes.FORM, ItemTypes.IMAGE],
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (ref.current) {
        const hoverIndex = getHoverIndex(clientOffset);
        setHoverIndex(hoverIndex);
      }
    },
    drop: (item) => {
      if (hoverIndex !== null) {
        moveElement(hoverIndex, item);
        setHoverIndex(null);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      clientOffset: monitor.getClientOffset(),
    }),
  });

  const getHoverIndex = (clientOffset) => {
    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverIndex = Math.floor(hoverClientY / (hoverBoundingRect.height / (components.length + 1)));
    return Math.min(hoverIndex, components.length);
  };

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: '20px',
        border: '1px solid #ccc',
        minHeight: '100vh',
        background: isOver ? '#f0f0f0' : 'white',
        position: 'relative',
      }}
    >
      <h3>Drag Area</h3>
      <div ref={ref} style={{ position: 'relative' }}>
        {components.map((component, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              width: component.width,
              height: component.height,
              backgroundColor: component.backgroundColor,
              color: component.textColor,
              fontSize: component.fontSize,
              padding: component.padding,
              margin: component.margin,
              borderWidth: component.borderWidth,
              borderStyle: component.borderStyle,
              borderColor: component.borderColor,
              borderRadius: component.borderRadius,
              textAlign: component.textAlign,
              fontFamily: component.fontFamily,
              backgroundImage: component.backgroundImage ? `url(${component.backgroundImage})` : 'none',
              overflow: 'hidden', // Prevents overflow without scrollbars
              boxSizing: 'border-box', // Includes padding and border in element's total width and height
            }}
            onClick={() => onComponentSelect(index)}
          >
            {component.type === ItemTypes.NAVBAR && <Nav backgroundColor={component.backgroundColor} textColor={component.textColor} />}
            {component.type === ItemTypes.FORM && <FormComponent />}
            {component.type === ItemTypes.IMAGE && <Image />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragArea;
