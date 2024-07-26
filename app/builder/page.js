"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DragArea from '@/components/DragArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Builder = () => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [components, setComponents] = useState([]);

  const handleSelectComponent = (index) => {
    setSelectedComponentIndex(index);
  };

  const handleUpdateComponent = (updates) => {
    if (selectedComponentIndex !== null) {
      setComponents((prevComponents) =>
        prevComponents.map((comp, idx) =>
          idx === selectedComponentIndex ? { ...comp, ...updates } : comp
        )
      );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        selectedComponent={components[selectedComponentIndex]}
        handleUpdateComponent={handleUpdateComponent}
        components={components}
        setComponents={setComponents}
      />
      <DragArea
        components={components}
        setComponents={setComponents}
        onComponentSelect={handleSelectComponent}
      />
    </div>
  );
};

export default Builder;
