import React, { useState } from 'react';



  const TextBoxComponent = ({ initialText, onTextChange, backgroundColor, textColor, fontSize }) => {
    const backgroundClass = backgroundColor ? `bg-${backgroundColor}` : '';
    const textClass = textColor ? `text-${textColor}` : '';
    const fontSizeClass = fontSize ? `text-${fontSize}` : '';

    const [text, setText] = useState(initialText);
    const [isEditable, setIsEditable] = useState(true);

    const handleChange = (e) => {
      setText(e.target.value);
      onTextChange(e.target.value);
    };

    const handleTextDrop = (e) => {
      e.preventDefault();
      const droppedText = e.dataTransfer.getData('text');
      setText(droppedText);
      onTextChange(droppedText);
      setIsEditable(false);
    };

    const handleTextDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <textarea
        type="text"
        value={text}
        onChange={handleChange}
        onDrop={handleTextDrop}
        onDragOver={handleTextDragOver}
        readOnly={!isEditable}
        className={`p-2 w-full border-0 ${backgroundClass} ${textClass} ${fontSizeClass}`}
      />
    );
  };

  export default TextBoxComponent;

 
