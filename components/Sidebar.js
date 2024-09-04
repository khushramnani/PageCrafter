import React, { useState } from 'react';
import { FaBars, FaEdit, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import DraggableItem from '@/components/DraggableItem';
import Edit from '@/components/Edit';

const Sidebar = ({ selectedComponent, handleUpdateComponent, components, setComponents, backgroundImage, setBackgroundImage }) => {
  const [showItems, setShowItems] = useState(true); // Toggle for "Items" dropdown
  const [showEditor, setShowEditor] = useState(false); // Toggle for editor visibility
  const [showNavbarItems, setShowNavbarItems] = useState(true); // Toggle for "Navbar" dropdown
  // const [showTemplateItems, setShowTemplateItems] = useState(false); // Toggle for "Templates" dropdown

  const toggleEditor = () => {
    setShowEditor(prev => !prev);
    console.log(`Editor visibility toggled: ${!showEditor}`); // Debugging line
  };

  return (
    <div className="w-[15vw] p-3 border-r border-gray-300 bg-slate-900 text-white min-h-[100vh]  flex flex-col">
      <div className="flex justify-between mb-2.5">
        <button onClick={() => setShowItems(!showItems)} className="border-none bg-none cursor-pointer">
          <FaBars size={24} />
        </button>
        {/* <button onClick={toggleEditor} className="border-none bg-none cursor-pointer">
          <FaEdit size={24} />
        </button> */}
      </div>
      {showItems && (
        <div>
          {/* Items Dropdown */}
          <button
            onClick={() => setShowNavbarItems(!showNavbarItems)}
            className="border-none bg-none cursor-pointer flex items-center"
          >
            {showNavbarItems ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
            <span className="ml-1.5">Items</span>
          </button>
          {showNavbarItems && (
            <div className="ml-5 mt-2.5">
              <DraggableItem type="navbar">Navbar</DraggableItem>
              <DraggableItem type="form">Form</DraggableItem>
              <DraggableItem type="image">Image</DraggableItem>
              <DraggableItem type="section">Section</DraggableItem>
              <DraggableItem type="checkbox">CheckBox</DraggableItem>
              <DraggableItem type="footer">Footer</DraggableItem> {/* Draggable Footer item */}
              <DraggableItem type="box">Empty Box</DraggableItem>
            </div>
          )}
          
 

        </div>
      )}

     

    </div>
  );
};

export default Sidebar;
