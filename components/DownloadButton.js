import React from 'react';
import { saveAs } from 'file-saver';

const generateCodeFiles = (htmlContent, cssContent, jsContent) => {
  const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
  const cssBlob = new Blob([cssContent], { type: 'text/css' });
  const jsBlob = new Blob([jsContent], { type: 'application/javascript' });

  saveAs(htmlBlob, 'index.html');
  saveAs(cssBlob, 'styles.css');
  saveAs(jsBlob, 'scripts.js');
};

const DownloadButton = ({ htmlContent, cssContent, jsContent }) => {
  const handleDownload = () => {
    generateCodeFiles(htmlContent, cssContent, jsContent);
  };

  return (
    <button
      onClick={handleDownload}
      className="btn btn-primary"
      style={{
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        border: 'none',
        color: '#fff',
      }}
    >
      Download Code
    </button>
  );
};

export default DownloadButton;
