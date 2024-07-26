import React, { useState, useEffect } from 'react';

const Edit = ({ selectedComponent, handleUpdateComponent }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [padding, setPadding] = useState(0);
  const [margin, setMargin] = useState(0);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderColor, setBorderColor] = useState('');
  const [borderRadius, setBorderRadius] = useState(0);
  const [textAlign, setTextAlign] = useState('left');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (selectedComponent) {
      setWidth(parseInt(selectedComponent.width) || 100);
      setHeight(parseInt(selectedComponent.height) || 100);
      setBackgroundColor(selectedComponent.backgroundColor || '');
      setTextColor(selectedComponent.textColor || '');
      setFontSize(parseInt(selectedComponent.fontSize) || 16);
      setPadding(parseInt(selectedComponent.padding) || 0);
      setMargin(parseInt(selectedComponent.margin) || 0);
      setBorderWidth(parseInt(selectedComponent.borderWidth) || 1);
      setBorderStyle(selectedComponent.borderStyle || 'solid');
      setBorderColor(selectedComponent.borderColor || '');
      setBorderRadius(parseInt(selectedComponent.borderRadius) || 0);
      setTextAlign(selectedComponent.textAlign || 'left');
      setFontFamily(selectedComponent.fontFamily || 'Arial');
      setBackgroundImage(selectedComponent.backgroundImage || '');
    }
  }, [selectedComponent]);

  useEffect(() => {
    if (selectedComponent) {
      handleUpdateComponent({
        ...selectedComponent,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        textColor,
        fontSize: `${fontSize}px`,
        padding: `${padding}px`,
        margin: `${margin}px`,
        borderWidth: `${borderWidth}px`,
        borderStyle,
        borderColor,
        borderRadius: `${borderRadius}px`,
        textAlign,
        fontFamily,
        backgroundImage
      });
    }
  }, [
    width, height, backgroundColor, textColor, fontSize,
    padding, margin, borderWidth, borderStyle, borderColor,
    borderRadius, textAlign, fontFamily, backgroundImage
  ]);

  return (
    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '105%' }}>
      <h4>Edit Component</h4>
      <div style={{ marginBottom: '20px' }}>
        <label>Width: {width}px</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Height: {height}px</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Text Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Font Size: {fontSize}px</label>
        <input
          type="range"
          min="8"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Padding: {padding}px</label>
        <input
          type="range"
          min="0"
          max="100"
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Margin: {margin}px</label>
        <input
          type="range"
          min="0"
          max="100"
          value={margin}
          onChange={(e) => setMargin(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Border Width: {borderWidth}px</label>
        <input
          type="range"
          min="0"
          max="20"
          value={borderWidth}
          onChange={(e) => setBorderWidth(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Border Style:</label>
        <select
          value={borderStyle}
          onChange={(e) => setBorderStyle(e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Border Color:</label>
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Border Radius: {borderRadius}px</label>
        <input
          type="range"
          min="0"
          max="100"
          value={borderRadius}
          onChange={(e) => setBorderRadius(Number(e.target.value))}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Text Alignment:</label>
        <select
          value={textAlign}
          onChange={(e) => setTextAlign(e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Background Image URL:</label>
        <input
          type="text"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          placeholder="Enter background image URL"
        />
      </div>
    </div>
  );
};

export default Edit;
