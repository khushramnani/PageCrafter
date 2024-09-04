import React from 'react';

const PreviewButton = ({ htmlContent, cssContent }) => {
  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    const combinedContent = `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;
    previewWindow.document.write(combinedContent);
    previewWindow.document.close();
  };

  return (
    <button onClick={handlePreview} className="p-2 text-sm rounded-sm bg-blue-600 text-white" >
      Preview
    </button>
  );
};

export default PreviewButton;
