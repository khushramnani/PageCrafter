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
    // console.log(`Editor visibility toggled: ${!showEditor}`); // Debugging line
  };

  return (
    <div className="bg-slate-900 w-64 p-5 border-r border-gray-300 flex flex-col">
      <div className="flex justify-between mb-2.5">
        <button onClick={() => setShowItems(!showItems)} className="border-none bg-none cursor-pointer">
          <FaBars color='white' size={24} />
        </button>
        <button onClick={toggleEditor} className="border-none bg-none cursor-pointer">
          <FaEdit color='white' size={24} />
        </button>
      </div>
      {showItems && (
        <div>
          <h3 className="text-white">Items</h3>
          <DraggableItem type="navbar">Navbar</DraggableItem>
          <DraggableItem type="form">Form</DraggableItem>
          <DraggableItem type="image">Image</DraggableItem>
        </div>
      )}
      {showEditor && (
        <div className="mt-5">
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
