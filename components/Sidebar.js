import React, { useState } from 'react';
import { FaBars, FaEdit, FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Importing icons
import DraggableItem from '@/components/DraggableItem';
import Edit from '@/components/Edit';

const Sidebar = ({ selectedComponent, handleUpdateComponent, components, setComponents, backgroundImage, setBackgroundImage }) => {
  const [showItems, setShowItems] = useState(false); // Toggle for "Items" dropdown
  const [showEditor, setShowEditor] = useState(false); // Toggle for editor visibility
  const [showNavbarItems, setShowNavbarItems] = useState(false); // Toggle for "Navbar" dropdown
  const [showTemplateItems, setShowTemplateItems] = useState(false); // Toggle for "Templates" dropdown

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
          {/* Items Dropdown */}
          <button onClick={() => setShowNavbarItems(!showNavbarItems)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {showNavbarItems ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
            <span style={{ marginLeft: '5px' }}>Items</span>
          </button>
          {showNavbarItems && (
            <div style={{ marginLeft: '20px', marginTop: '10px' }}>
              <DraggableItem type="navbar">Navbar</DraggableItem>
              <DraggableItem type="form">Form</DraggableItem>
              <DraggableItem type="image">Image</DraggableItem>
              <DraggableItem type="section">Section</DraggableItem>
              <DraggableItem type="footer">Footer</DraggableItem>  {/* Draggable Footer item */}
              <DraggableItem type="box">Empty Box</DraggableItem>
            </div>
          )}
          {/* Templates Dropdown */}
          <button onClick={() => setShowTemplateItems(!showTemplateItems)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            {showTemplateItems ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
            <span style={{ marginLeft: '5px' }}>Templates</span>
          </button>
          {showTemplateItems && (
            <div style={{ marginLeft: '20px', marginTop: '10px' }}>
              <DraggableItem type="navbar1">Navbar 1</DraggableItem>
              <DraggableItem type="navbar2">Navbar 2</DraggableItem>
              <DraggableItem type="navbar3">Navbar 3</DraggableItem>
              <DraggableItem type="navbar4">Navbar 4</DraggableItem>
              <DraggableItem type="navbar5">Navbar 5</DraggableItem>
              <DraggableItem type="navbar6">Navbar 6</DraggableItem>
              <DraggableItem type="navbar7">Navbar 7</DraggableItem>
              <DraggableItem type="navbar8">Navbar 8</DraggableItem>
              <DraggableItem type="navbar9">Navbar 9</DraggableItem>
              <DraggableItem type="navbar10">Navbar 10</DraggableItem>
            </div>
          )}
        </div>
      )}
      {showEditor && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit Component</h3>
          <Edit
            selectedComponent={selectedComponent}
            handleUpdateComponent={handleUpdateComponent}
            components={components}
            setComponents={setComponents}
          />
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <h4>Background Image</h4>
        <input
          type="text"
          placeholder="Enter background image URL"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
