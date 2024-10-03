import React, { useState } from 'react';
import { FaBars, FaEdit, FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Importing icons
import DraggableItem from './DraggableItem';
import Edit from './Edit';


const Sidebar = ({ selectedComponent, handleUpdateComponent, components, setComponents, backgroundImage, setBackgroundImage }) => {
  const [showItems, setShowItems] = useState(true); // Toggle for "Items" dropdown
  const [showNavbarItems, setShowNavbarItems] = useState(false); // Toggle for "Navbar" dropdown
  const [showNavbarStyles, setShowNavbarStyles] = useState(false); // Toggle for "Navbar Styles" dropdown
  const [showFormStyles, setShowFormStyles] = useState(false); // Toggle for "Form Styles" dropdown
  const [showSectionStyles, setShowSectionStyles] = useState(false); // Toggle for "Section Styles" dropdown
  const [showTemplateItems, setShowTemplateItems] = useState(false); // Toggle for "Templates" dropdown

  return (
    <>
      <div className="bg-slate-900 text-white h-full w-64 p-3 border-r border-gray-300 flex flex-col">
        {/* Components Dropdown */}
        {showItems && (
          <div className='p-2 '>
            <button
              onClick={() => setShowNavbarItems(!showNavbarItems)}
              className="flex items-center bg-none cursor-pointer mb-1 focus:outline-none"
            >
              {showNavbarItems ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
              <span className="ml-2 text-xl">Components</span>
            </button>
            {showNavbarItems && (
              <div className="ml-4 mt-2">
                {/* Navbar Styles Dropdown */}
                <button
                  onClick={() => setShowNavbarStyles(!showNavbarStyles)}
                  className="flex items-center bg-none cursor-pointer mb-2 focus:outline-none"
                >
                  {showNavbarStyles ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                  <span className="ml-2 text-lg">Navbar Styles</span>
                </button>
                {showNavbarStyles && (
                  <div className="ml-4 mt-2">
                    <DraggableItem type="navbarStyle1">Navbar Style 1</DraggableItem>
                    <DraggableItem type="navbarStyle2">Navbar Style 2</DraggableItem>
                    <DraggableItem type="navbarStyle3">Navbar Style 3</DraggableItem>
                    <DraggableItem type="navbarStyle4">Navbar Style 4</DraggableItem>
                    <DraggableItem type="navbarStyle5">Navbar Style 5</DraggableItem>
                  </div>
                )}

                {/* Form Styles Dropdown */}
                <button
                  onClick={() => setShowFormStyles(!showFormStyles)}
                  className="flex items-center bg-none cursor-pointer mb-2 focus:outline-none"
                >
                  {showFormStyles ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                  <span className="ml-2 text-lg">Form Styles</span>
                </button>
                {showFormStyles && (
                  <div className="ml-6 mt-2">
                    <DraggableItem type="formStyle1">Form Style 1</DraggableItem>
                    <DraggableItem type="formStyle2">Form Style 2</DraggableItem>
                    <DraggableItem type="formStyle3">Form Style 3</DraggableItem>
                    <DraggableItem type="formStyle4">Form Style 4</DraggableItem>
                    <DraggableItem type="formStyle5">Form Style 5</DraggableItem>
                  </div>
                )}

                {/* Section Styles Dropdown */}
                <button
                  onClick={() => setShowSectionStyles(!showSectionStyles)}
                  className="flex items-center bg-none cursor-pointer mb-2 focus:outline-none"
                >
                  {showSectionStyles ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                  <span className="ml-2 text-lg">Section Styles</span>
                </button>
                {showSectionStyles && (
                  <div className="ml-6 mt-2">
                    <DraggableItem type="sectionStyle1">Section Style 1</DraggableItem>
                    <DraggableItem type="sectionStyle2">Section Style 2</DraggableItem>
                    <DraggableItem type="sectionStyle3">Section Style 3</DraggableItem>
                    <DraggableItem type="sectionStyle4">Section Style 4</DraggableItem>
                    <DraggableItem type="sectionStyle5">Section Style 5</DraggableItem>
                  </div>
                )}

                {/* Other Items */}
                {/* <DraggableItem type="form">Form</DraggableItem> */}
                <DraggableItem type="image">Image</DraggableItem>
                <DraggableItem type="section">Section</DraggableItem>
                <DraggableItem type="footer">Footer</DraggableItem> {/* Draggable Footer item */}
                <DraggableItem type="box">Empty Box</DraggableItem>
                <DraggableItem type="checkbox">Check Box</DraggableItem>
                <DraggableItem type="text">Text Area</DraggableItem>
              </div>
            )}
          </div>
        )}

        {/* Templates Dropdown */}
        <div className='p-2 '>
        <button
          onClick={() => setShowTemplateItems(!showTemplateItems)}
          className="flex items-center bg-none cursor-pointer mt-2 mb-2 focus:outline-none"
        >
          {showTemplateItems ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
          <span className="ml-2 text-xl">Templates</span>
        </button>
        {showTemplateItems && (
          <div className="ml-2 mt-2">
            <DraggableItem type="templateStyle1">Template 1</DraggableItem>
            <DraggableItem type="templateStyle2">Template 2</DraggableItem>
            <DraggableItem type="templateStyle3">Template 3</DraggableItem>
            <DraggableItem type="templateStyle4">Template 4</DraggableItem>
            <DraggableItem type="templateStyle5">Template 5</DraggableItem>
          </div>
        )}
        </div>


      </div>
    </>
  );
};

export default Sidebar;
