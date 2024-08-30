import React, { useState, useEffect } from 'react';

const Edit = ({ selectedComponent, handleUpdateComponent }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [padding, setPadding] = useState('');
  const [margin, setMargin] = useState('');
  const [borderWidth, setBorderWidth] = useState('');
  const [borderStyle, setBorderStyle] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderRadius, setBorderRadius] = useState('');
  const [textAlign, setTextAlign] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (selectedComponent) {
      setWidth(selectedComponent.width ? selectedComponent.width.replace('vw', '') : '100'); // Default width
      setHeight(selectedComponent.height ? selectedComponent.height.replace('px', '') : '100'); // Default height
      setBackgroundColor(selectedComponent.backgroundColor || '#ffffff'); // Default color
      setTextColor(selectedComponent.textColor || '#000000'); // Default text color
      setFontSize(selectedComponent.fontSize ? selectedComponent.fontSize.replace('px', '') : '16'); // Default font size
      setPadding(selectedComponent.padding ? selectedComponent.padding.replace('px', '') : '0'); // Default padding
      setMargin(selectedComponent.margin ? selectedComponent.margin.replace('px', '') : '0'); // Default margin
      setBorderWidth(selectedComponent.borderWidth ? selectedComponent.borderWidth.replace('px', '') : '1'); // Default border width
      setBorderStyle(selectedComponent.borderStyle || 'solid'); // Default border style
      setBorderColor(selectedComponent.borderColor || '#000000'); // Default border color
      setBorderRadius(selectedComponent.borderRadius ? selectedComponent.borderRadius.replace('px', '') : '0'); // Default border radius
      setTextAlign(selectedComponent.textAlign || 'left'); // Default text alignment
      setFontFamily(selectedComponent.fontFamily || 'Arial'); // Default font family
      setBackgroundImage(selectedComponent.backgroundImage || ''); // Default background image
    }
  }, [selectedComponent]);

  const handleImmediateChange = (field, value) => {
    const updatedComponent = {
      ...selectedComponent,
      [field]: value
    };
    handleUpdateComponent(updatedComponent);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg bg-gray-100 w-full max-w-lg mx-auto">
      <h2 className="mb-5 text-xl">Edit Component</h2>

      <div className="mb-5">
        <h3 className="text-lg mb-2">Dimensions</h3>
        <div className="space-y-3">
          <label className="block font-bold">
            Width:
            <input
              type="number"
              value={width}
              onChange={(e) => {
                const newWidth = `${e.target.value}vw`;
                setWidth(e.target.value);
                handleImmediateChange('width', newWidth);
              }}
              placeholder="Width in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
          <label className="block font-bold">
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => {
                const newHeight = `${e.target.value}vh`;
                setHeight(e.target.value);
                handleImmediateChange('height', newHeight);
              }}
              placeholder="Height in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg mb-2">Background</h3>
        <div className="space-y-3">
          <label className="block font-bold">
            Background Color:
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
                handleImmediateChange('backgroundColor', e.target.value);
              }}
              className="block mt-1 p-0 w-14 h-7 border-none cursor-pointer"
            />
          </label>
          <label className="block font-bold">
            Background Image URL:
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => {
                setBackgroundImage(e.target.value);
                handleImmediateChange('backgroundImage', e.target.value);
              }}
              placeholder="Background Image URL"
              className="block w-full mt-1 p-2 text-base border rounded-md"
            />
          </label>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg mb-2">Text</h3>
        <div className="space-y-3">
          <label className="block font-bold">
            Text Color:
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                handleImmediateChange('textColor', e.target.value);
              }}
              className="block mt-1 p-0 w-14 h-7 border-none cursor-pointer"
            />
          </label>
          <label className="block font-bold">
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => {
                const newFontSize = `${e.target.value}px`;
                setFontSize(e.target.value);
                handleImmediateChange('fontSize', newFontSize);
              }}
              placeholder="Font Size in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
          <label className="block font-bold">
            Font Family:
            <input
              type="text"
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                handleImmediateChange('fontFamily', e.target.value);
              }}
              placeholder="Font Family"
              className="block w-full mt-1 p-2 text-base border rounded-md"
            />
          </label>
          <label className="block font-bold">
            Text Align:
            <select
              value={textAlign}
              onChange={(e) => {
                setTextAlign(e.target.value);
                handleImmediateChange('textAlign', e.target.value);
              }}
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg mb-2">Box Model</h3>
        <div className="space-y-3">
          <label className="block font-bold">
            Padding:
            <input
              type="number"
              value={padding}
              onChange={(e) => {
                const newPadding = `${e.target.value}px`;
                setPadding(e.target.value);
                handleImmediateChange('padding', newPadding);
              }}
              placeholder="Padding in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
          <label className="block font-bold">
            Margin:
            <input
              type="number"
              value={margin}
              onChange={(e) => {
                const newMargin = `${e.target.value}px`;
                setMargin(e.target.value);
                handleImmediateChange('margin', newMargin);
              }}
              placeholder="Margin in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg mb-2">Border</h3>
        <div className="space-y-3">
          <label className="block font-bold">
            Border Width:
            <input
              type="number"
              value={borderWidth}
              onChange={(e) => {
                const newBorderWidth = `${e.target.value}px`;
                setBorderWidth(e.target.value);
                handleImmediateChange('borderWidth', newBorderWidth);
              }}
              placeholder="Border Width in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
          <label className="block font-bold">
            Border Style:
            <select
              value={borderStyle}
              onChange={(e) => {
                setBorderStyle(e.target.value);
                handleImmediateChange('borderStyle', e.target.value);
              }}
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            >
              <option value="">None</option>
              <option value="solid">Solid</option>
              <option value="dotted">Dotted</option>
              <option value="dashed">Dashed</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
            </select>
          </label>
          <label className="block font-bold">
            Border Color:
            <input
              type="color"
              value={borderColor}
              onChange={(e) => {
                setBorderColor(e.target.value);
                handleImmediateChange('borderColor', e.target.value);
              }}
              className="block mt-1 p-0 w-14 h-7 border-none cursor-pointer"
            />
          </label>
          <label className="block font-bold">
            Border Radius:
            <input
              type="number"
              value={borderRadius}
              onChange={(e) => {
                const newBorderRadius = `${e.target.value}px`;
                setBorderRadius(e.target.value);
                handleImmediateChange('borderRadius', newBorderRadius);
              }}
              placeholder="Border Radius in px"
              className="block w-full mt-1 p-2 text-base border rounded-md max-w-xs"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Edit;
