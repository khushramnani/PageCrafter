import React, { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Navbar from '@/Web-components/Navbar';
import FormComponent from '@/Web-components/FormComponent';
import Image from '@/Web-components/Image';
import Section from '@/components/Section';
import Footer from '@/Web-components/Footer';  
import axios from 'axios';

const DragArea = ({ components, setComponents, onComponentSelect, setHtmlContent }) => {
  const dropAreaRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  const moveElement = (index, item) => {
    const newComponents = [...components];
    if (hoverIndex !== null) {
      newComponents.splice(index, 0, { ...item, width: '100%', height: '100%' });
      setComponents(newComponents);
    }
  };

  const handleDropIntoSection = (sectionIndex, item, side) => {
    const newComponents = [...components];
    const component = newComponents[sectionIndex];
    if (component && component.type === 'section') {
      if (side === 'left') {
        component.leftComponent = serializeComponent(item);
      } else {
        component.rightComponent = serializeComponent(item);
      }
      setComponents(newComponents);
    }
  };

  const serializeComponent = (component) => ({
    type: component.type,
    props: component.props,
  });

  const deserializeComponent = (component) => {
    switch (component.type) {
      case 'navbar':
        return <Navbar {...component.props} />;
      case 'form':
        return <FormComponent {...component.props} />;
      case 'image':
        return <Image {...component.props} />;
      case 'section':
        return (
          <Section
            leftComponent={component.leftComponent ? deserializeComponent(component.leftComponent) : null}
            rightComponent={component.rightComponent ? deserializeComponent(component.rightComponent) : null}
            onDropLeft={(item) => handleDropIntoSection(component.index, item, 'left')}
            onDropRight={(item) => handleDropIntoSection(component.index, item, 'right')}
          />
        );
      case 'footer':
        return <Footer {...component.props} />;
      default:
        return null;
    }
  };

  const fetchComponentsFromDatabase = async () => {
    try {
      const response = await axios.get('/api/components');
      const fetchedComponents = response.data;
      const deserializedComponents = fetchedComponents.map((component) =>
        deserializeComponent(component)
      );
      setComponents(deserializedComponents);
    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  const saveComponentsToDatabase = async () => {
    try {
      const serializedComponents = components.map((component) => {
        if (component.type === 'section') {
          return {
            ...component,
            leftComponent: component.leftComponent
              ? serializeComponent(component.leftComponent)
              : null,
            rightComponent: component.rightComponent
              ? serializeComponent(component.rightComponent)
              : null,
          };
        }
        return serializeComponent(component);
      });
      await axios.post('/api/components', serializedComponents);
    } catch (error) {
      console.error('Error saving components:', error);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ['navbar', 'form', 'image', 'section', 'footer'],
    hover: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (dropAreaRef.current) {
        const hoverIndex = getHoverIndex(clientOffset);
        setHoverIndex(hoverIndex);
        setDraggedItem(item);
      }
    },
    drop: (item, monitor) => {
      if (hoverIndex !== null) {
        moveElement(hoverIndex, item);
        setHoverIndex(null);
        updateHtmlContent();
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const getHoverIndex = (clientOffset) => {
    const hoverBoundingRect = dropAreaRef.current.getBoundingClientRect();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverIndex = Math.floor(
      hoverClientY / (hoverBoundingRect.height / (components.length + 1))
    );
    return Math.min(hoverIndex, components.length);
  };

  const updateHtmlContent = () => {
    if (dropAreaRef.current) {
      const htmlContent = dropAreaRef.current.innerHTML;
      if (setHtmlContent && typeof setHtmlContent === 'function') {
        setHtmlContent(htmlContent);
      }
    }
  };

  useEffect(() => {
    updateHtmlContent();
  }, [components]);

  useEffect(() => {
    fetchComponentsFromDatabase();
  }, []);

  return (
    <div
      ref={(node) => drop(dropAreaRef.current = node)}
      className={`flex-1 p-5 border border-gray-300 min-h-screen ${
        isOver ? 'bg-gray-200' : 'bg-white'
      } relative`}
    >
      <h3>Drag Area</h3>
      <div ref={dropAreaRef} className="relative">
        {components.map((component, index) => (
          <div key={index} className="mb-4">
            {deserializeComponent(component)}
          </div>
        ))}
        {isOver && (
          <div className="absolute w-full h-full bg-green-100 opacity-50 z-10"></div>
        )}
      </div>
    </div>
  );
};

export default DragArea;
