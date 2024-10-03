import React, { useState, useEffect } from 'react';

const Template2 = () => {
  // State for managing editable content
  const [content, setContent] = useState({
    brand: 'GAMING HUB',
    heroTitle: 'Join the Battle!',
    heroDescription: 'Unleash your inner warrior and conquer new worlds.',
    featuredInfo: [
      { title: 'The Evolution of Gaming', text: 'From classic arcade games to modern immersive experiences, gaming has evolved into a multifaceted industry that attracts millions of players worldwide.' },
      { title: 'The Rise of Esports', text: 'Esports has transformed competitive gaming into a spectator sport, with professional leagues and tournaments offering substantial prizes and drawing large audiences.' },
      { title: 'Gaming Communities', text: 'Online gaming fosters vibrant communities, allowing players to connect, collaborate, and share their gaming experiences across various platforms and genres.' }
    ],
    footerText: 'GAMING HUB © 2024',
    nav: ['Home', 'Games', 'News', 'Community', 'Support']
  });

  // State for handling editing mode
  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('gamingTemplateContent'));
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to localStorage
  useEffect(() => {
    localStorage.setItem('gamingTemplateContent', JSON.stringify(content));
  }, [content]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save the edited value on blur or Enter key
  const handleSave = () => {
    if (editingKey.includes('featuredInfo')) {
      const index = parseInt(editingKey.split('.')[1]);
      const field = editingKey.split('.')[2];
      const updatedInfo = [...content.featuredInfo];
      updatedInfo[index][field] = inputValue;
      setContent((prev) => ({ ...prev, featuredInfo: updatedInfo }));
    } else if (editingKey.includes('nav')) {
      const index = parseInt(editingKey.split('.')[1]);
      const updatedNav = [...content.nav];
      updatedNav[index] = inputValue;
      setContent((prev) => ({ ...prev, nav: updatedNav }));
    } else {
      setContent((prev) => ({ ...prev, [editingKey]: inputValue }));
    }
    setEditingKey(null);
  };

  // Enable editing mode for a specific section
  const handleDoubleClick = (key) => {
    setEditingKey(key);
    const value = key.includes('featuredInfo')
      ? content.featuredInfo[parseInt(key.split('.')[1])][key.split('.')[2]]
      : content[key];
    setInputValue(value);
  };

  return (
    <div className="font-sans text-gray-900">
      {/* Header */}
      <header className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="text-3xl font-bold">
          {editingKey === 'brand' ? (
            <input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
              className="w-[50%] text-black p-2"
            />
          ) : (
            <span onDoubleClick={() => handleDoubleClick('brand')}>{content.brand}</span>
          )}
        </div>
        <nav className="flex space-x-6">
          {content.nav.map((item, index) => (
            <span
              key={index}
              onDoubleClick={() => handleDoubleClick(`nav.${index}`)}
              className="hover:text-gray-200 cursor-pointer"
            >
              {editingKey === `nav.${index}` ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className="w-[50%] text-black p-2"
                />
              ) : (
                content.nav && content.nav[index] ? content.nav[index] : item
              )}
            </span>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-black text-white h-96 flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8')] bg-cover bg-center opacity-40"></div>
        <div className="relative text-center z-10">
          {editingKey === 'heroTitle' ? (
            <input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
              className="text-5xl text-black font-bold mb-4"
            />
          ) : (
            <h1 className="text-5xl font-extrabold mb-4" onDoubleClick={() => handleDoubleClick('heroTitle')}>
              {content.heroTitle}
            </h1>
          )}
          {editingKey === 'heroDescription' ? (
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
              className="text-lg text-black p-2"
            />
          ) : (
            <p className="text-lg mb-6" onDoubleClick={() => handleDoubleClick('heroDescription')}>
              {content.heroDescription}
            </p>
          )}
          <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg hover:bg-yellow-600 transition duration-300">
            Start Playing
          </button>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Gaming Information</h2>
          <div className="flex flex-col space-y-8">
            {content.featuredInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                {editingKey === `featuredInfo.${index}.title` ? (
                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    autoFocus
                    className="text-2xl text-black font-bold mb-2"
                  />
                ) : (
                  <h3 className="text-2xl font-bold mb-2" onDoubleClick={() => handleDoubleClick(`featuredInfo.${index}.title`)}>
                    {info.title}
                  </h3>
                )}
                {editingKey === `featuredInfo.${index}.text` ? (
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleSave}
                    autoFocus
                    className="text-black p-2"
                  />
                ) : (
                  <p className="text-gray-600" onDoubleClick={() => handleDoubleClick(`featuredInfo.${index}.text`)}>
                    {info.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold">
              {editingKey === 'footerText' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className="text-black p-2"
                />
              ) : (
                <span onDoubleClick={() => handleDoubleClick('footerText')}>
                  {content.footerText}
                </span>
              )}
            </div>
            <nav className="space-x-6 mt-4">
              <a href="#" className="hover:text-gray-400">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400">Terms of Service</a>
              <a href="#" className="hover:text-gray-400">Contact Us</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template2;
