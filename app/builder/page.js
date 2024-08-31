import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragArea from '@/components/DragArea';
import DownloadButton from '@/components/DownloadButton';
import PreviewButton from '@/components/PreviewButton';
import Sidebar from '@/components/Sidebar';
import SaveButton from '@/components/SaveButton'; // Import SaveButton
import 'bootstrap/dist/css/bootstrap.min.css'; 

const extractCss = () => {
  const styles = document.styleSheets;
  let cssContent = '';

  for (let i = 0; i < styles.length; i++) {
    try {
      const rules = styles[i].cssRules;
      for (let j = 0; j < rules.length; j++) {
        cssContent += rules[j].cssText;
      }
    } catch (e) {
      console.warn('Could not access stylesheet:', styles[i].href);
    }
  }

  return cssContent;
};

const App = () => {
  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);
  const [components, setComponents] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [error, setError] = useState(null); // State to handle errors

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
    const html = document.querySelector('.drag-area').innerHTML;
    const css = extractCss();
    setHtmlContent(html);
    setCssContent(css);
  };

  const loadLayout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/load-layout');
      if (response.data) {
        setComponents(response.data.components);
      }
    } catch (error) {
      setError('Error loading layout. Please try again later.');
      console.error('Error loading layout:', error);
    }
  };

  useEffect(() => {
    loadLayout(); // Load layout on component mount
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="flex w-full">
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
            setHtmlContent={handleSetHtmlContent}
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error if any */}
        <div className="mt-5 flex space-x-4">
          <DownloadButton htmlContent={htmlContent} cssContent={cssContent} jsContent="" />
          <PreviewButton htmlContent={htmlContent} cssContent={cssContent} />
          <SaveButton components={components} /> {/* Add SaveButton */}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
