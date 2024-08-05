"use client";
import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import Nav from "@/components/Nav";
import FormComponent from '@/components/FormComponent';
import Image from 'next/image';
import { DndProvider } from 'react-dnd';
import Edit from '@/components/Edit';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Images from './Image';

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
    <>

    <div 
      ref={drop}
      className={`flex-1   border border-gray-300 min-h-screen relative ${isOver ? 'bg-gray-200' : 'bg-slate-700'}`}
    >
      <nav className='flex items-center justify-center w-full h-16 bg-slate-900 sticky ' >
<h3>drag nav</h3>
</nav>
      
      <div ref={ref} className="relative p-10 bg-slate-700 border border-gray-700">
        {components.map((component, index) => (
          <div
            key={index}
            className={`relative overflow-hidden box-border ${component.width === '100%' ? 'w-full' : ''} ${component.height === 'auto' ? 'h-auto' : ''}`}
            style={{
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
              ImageUrl: component.ImageUrl ? `url(${component.ImageUrl})` : 'none',
            }}
            onClick={() => onComponentSelect(index)}
          >
            {component.type === ItemTypes.NAVBAR && <Nav backgroundColor={component.backgroundColor} textColor={component.textColor} />}
            {component.type === ItemTypes.FORM && <FormComponent />}
            {component.type === ItemTypes.IMAGE && <Images/>}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default DragArea;
