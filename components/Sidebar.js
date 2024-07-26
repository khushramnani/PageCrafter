import React, { useState } from 'react';
import { FaBars, FaEdit } from 'react-icons/fa'; // Importing icons
import DraggableItem from '@/components/DraggableItem';
import Edit from '@/components/Edit';

const Sidebar = ({ selectedComponent, handleUpdateComponent, components, setComponents }) => {
  const [showItems, setShowItems] = useState(false); // Initially hidden
  const [showEditor, setShowEditor] = useState(false); // Initially hidden

  // Handler to toggle editor visibility
  const toggleEditor = () => {
    setShowEditor(prev => !prev);
    console.log(`Editor visibility toggled: ${!showEditor}`); // Debugging line
  };

  return (
    <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={() => setShowItems(!showItems)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaBars size={24} />
        </button>
        <button onClick={toggleEditor} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaEdit size={24} />
        </button>
      </div>
      {showItems && (
        <div>
          <h3>Items</h3>
          <DraggableItem type="navbar">Navbar</DraggableItem>
          <DraggableItem type="form">Form</DraggableItem>
          <DraggableItem type="image">Image</DraggableItem>
        </div>
      )}
      {showEditor && (
        <div style={{ marginTop: '20px' }}>
          <Edit
            selectedComponent={selectedComponent}
            handleUpdateComponent={handleUpdateComponent}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
