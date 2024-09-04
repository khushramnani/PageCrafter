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
      className="p-1 text-sm rounded-sm h-auto bg-blue-600 text-white"

    >
      Download Code
    </button>
  );
};

export default DownloadButton;
