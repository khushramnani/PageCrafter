import React, { useState } from 'react';
import { FaBars, FaEdit } from 'react-icons/fa'; // Importing icons
import DraggableItem from './DraggableItem';
import Edit from './Edit';

const Sidebar = ({ selectedComponent, handleUpdateComponent, components, setComponents }) => {
  const [showItems, setShowItems] = useState(false); // Initially hidden
  const [showEditor, setShowEditor] = useState(false); // Initially hidden

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
          <DraggableItem type="section">Section</DraggableItem>
          <DraggableItem type="footer">Footer</DraggableItem>  {/* Draggable Footer item */}
        </div>
      )}
      {showEditor && (
        <div style={{
          marginTop: '20px'
        }}>
          <h3>Edit Component</h3>
          <Edit
            selectedComponent={selectedComponent}
            handleUpdateComponent={handleUpdateComponent}
            components={components}
            setComponents={setComponents}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;