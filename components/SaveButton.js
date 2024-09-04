import React from 'react';
import axios from 'axios';

const SaveButton = ({ components }) => {
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/save-layout', { components });
      alert('Layout saved successfully!');
    } catch (error) {
      console.error('Error saving layout:', error);
      alert('Error saving layout');
    }
  };

  return (
    <button onClick={handleSave} style={{ margin: '10px', padding: '10px' }}>
      Save Layout
    </button>
  );
};

export default SaveButton;


