// App.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragArea from "@/components/DragArea";
import Sidebar from "@/components/Sidebar";
import EditBar from "@/components/EditSection";
import AreaNav from "@/components/BuildAreaNav";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [components, setComponents] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [error, setError] = useState(null);

  // Refs for Sidebar and EditBar
  const sidebarRef = useRef(null);
  const editBarRef = useRef(null);

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

  const handleSetHtmlContent = () => {
    const dragArea = document.querySelector(".drag-area");
    if (dragArea) {
      const html = dragArea.innerHTML;
      const css = extractCss();
      setHtmlContent(html);
      setCssContent(css);
    }
  };

  const extractCss = () => {
    let cssContent = "";
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          cssContent += rule.cssText;
        }
      } catch (e) {
        console.warn("Could not access stylesheet:", sheet.href);
      }
    }
    return cssContent;
  };

  const loadLayout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/load-layout");
      if (response.data) {
        setComponents(response.data.components);
      }
    } catch (error) {
      setError("Error loading layout. Please try again later.");
      console.error("Error loading layout:", error);
    }
  };

  // Click outside handler to deselect components
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        editBarRef.current &&
        !editBarRef.current.contains(event.target)
      ) {
        setSelectedComponentIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load layout on mount
  useEffect(() => {
    loadLayout();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <AreaNav
          htmlContent={htmlContent}
          cssContent={cssContent}
          handleSetHtmlContent={handleSetHtmlContent}
          components={components}
        />
        <div className="flex flex-1 overflow-hidden">
          <div ref={sidebarRef} className="w-auto border-r overflow-auto">
            <Sidebar
              selectedComponent={components[selectedComponentIndex]}
              handleUpdateComponent={handleUpdateComponent}
              components={components}
              setComponents={setComponents}
            />
          </div>
          <div className="flex-1 w-full overflow-auto">
            <DragArea
              components={components}
              setComponents={setComponents}
              onComponentSelect={handleSelectComponent}
              selectedComponentIndex={selectedComponentIndex}
              setHtmlContent={handleSetHtmlContent}
            />
          </div>
          <div ref={editBarRef} className="w-auto border-l overflow-auto">
            <EditBar
              selectedComponent={components[selectedComponentIndex]}
              handleUpdateComponent={handleUpdateComponent}
            />
          </div>
        </div>
        {/* {error && <div className="text-red-500 mt-2 text-center">{error}</div>} */}
      </div>
    </DndProvider>
  );
};

export default App;
