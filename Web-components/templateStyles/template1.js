import React, { useState, useEffect } from 'react';

// Navbar Component
const Navbar = ({ backgroundClass, textClass }) => {

  
  const [TextEdit, setText] = useState({
    brand: 'Samsung',
    Home: 'Home',
    About: "About",
    Services: "Services",
    Pricing: "Pricing",
    Contact: "Contact",
  });

  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState('Samsung');

  // Load text from local storage when the component mounts
  useEffect(() => {
    const savedText = JSON.parse(localStorage.getItem('TextEdit'));
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Save text to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('TextEdit', JSON.stringify(TextEdit));
  }, [TextEdit]);

  // Enable editing for a specific key
  const handleDoubleClick = (key) => {
    setEditingKey(key);
    setInputValue(TextEdit[key]); // Set the current value of the input field
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save the edited value on blur or Enter key
  const handleSave = () => {
    setText((prev) => ({ ...prev, [editingKey]: inputValue }));
    setEditingKey(null); // Exit editing mode
  };

  return (
    <nav className={`shadow-lg ${backgroundClass}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
      {editingKey === 'brand' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className="w-[50%] text-black p-2"
        />
      ) : (
        <span
          className={`no-underline font-bold ${textClass}`}
          aria-current="page"
          onDoubleClick={() => handleDoubleClick('brand')}
        >
          {TextEdit.brand}
        </span>
      )}
        <ul className="flex space-x-6">
          <li className={`hover:text-gray-300 cursor-pointer ${textClass}`}>
            
          {editingKey === 'Home' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className="w-[50%] text-black p-2"
        />
      ) : (
        <span
          className={`no-underline font-bold ${textClass}`}
          aria-current="page"
          onDoubleClick={() => handleDoubleClick('Home')}
        >
          {TextEdit.Home}
        </span>
      )}
            
            </li>
          <li className={`hover:text-gray-300 cursor-pointer ${textClass}`}>
            
          {editingKey === 'About' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className="w-[50%] text-black p-2"
        />
      ) : (
        <span
          className={`no-underline font-bold ${textClass}`}
          aria-current="page"
          onDoubleClick={() => handleDoubleClick('About')}
        >
          {TextEdit.About}
        </span>
      )}
            
            </li>
          <li className={`hover:text-gray-300 cursor-pointer ${textClass}`}>
            
          {editingKey === 'Pricing' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className="w-[50%] text-black p-2"
        />
      ) : (
        <span
          className={`no-underline font-bold ${textClass}`}
          aria-current="page"
          onDoubleClick={() => handleDoubleClick('Pricing')}
        >
          {TextEdit.Pricing}
        </span>
      )}
            
            </li>
          <li className={`hover:text-gray-300 cursor-pointer ${textClass}`}>
            
          {editingKey === 'Services' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className="w-[50%] text-black p-2"
        />
      ) : (
        <span
          className={`no-underline font-bold ${textClass}`}
          aria-current="page"
          onDoubleClick={() => handleDoubleClick('Services')}
        >
          {TextEdit.Services}
        </span>
      )}
            
            </li>
        </ul>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ backgroundClass, textClass }) => {
  const [heroText, setHeroText] = useState({
    title: 'The Next Generation',
    description: 'Discover the latest in innovation and technology.',
  });
  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleDoubleClick = (key) => {
    setEditingKey(key);
    setInputValue(heroText[key]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = (key) => {
    setHeroText((prev) => ({ ...prev, [key]: inputValue }));
    setEditingKey(null);
  };

  return (
    <section className={`relative h-screen bg-gray-900 text-white flex items-center ${backgroundClass}`}>
      
      <div className="relative z-10 container mx-auto text-center">
        {editingKey === 'title' ? (
          <input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => handleSave('title')}
            autoFocus
            className={`text-5xl text-black font-bold mb-4 ${textClass}`}
          />
        ) : (
          <h2
            className={`text-5xl font-bold mb-4 ${textClass}`}
            onDoubleClick={() => handleDoubleClick('title')}
          >
            {heroText.title}
          </h2>
        )}
        {editingKey === 'description' ? (
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => handleSave('description')}
            autoFocus
            className={`text-lg text-black mb-6 ${textClass}`}
          />
        ) : (
          <p
            className={`text-lg mb-6 ${textClass}`}
            onDoubleClick={() => handleDoubleClick('description')}
          >
            {heroText.description}
          </p>
        )}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

// Product Showcase Section
const ProductShowcase = ({ backgroundClass, textClass }) => {
  const [products, setProducts] = useState([
    {
      imgSrc: 'https://images.samsung.com/is/image/samsung/assets/latin/smartphones/galaxy-s21/galaxy-s21-5g/thumbnail/black.jpg',
      title: 'Galaxy S21',
      description: 'The ultimate smartphone experience.',
    },
    {
      imgSrc: 'https://images.samsung.com/is/image/samsung/assets/latin/tvs/qn90a/01_qn90a_qled_tv_pdp.jpg',
      title: 'QN90A TV',
      description: 'Experience the next level of viewing.',
    },
    {
      imgSrc: 'https://images.samsung.com/is/image/samsung/assets/latin/tablets/galaxy-tab-s7/gallery/04_Galaxy_Tab_S7_Mystic_Navy_Lifestyle.jpg',
      title: 'Galaxy Tab S7',
      description: 'The tablet that works like a PC.',
    },
  ]);

  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleDoubleClick = (key, field) => {
    setEditingKey({ key, field });
    setInputValue(products[key][field]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((product, index) =>
        index === editingKey.key
          ? { ...product, [editingKey.field]: inputValue }
          : product
      )
    );
    setEditingKey(null);
  };

  const [sectionTitle, setSectionTitle] = useState('Featured Products');
  const [editingSectionTitle, setEditingSectionTitle] = useState(false);
  const [sectionTitleInput, setSectionTitleInput] = useState(sectionTitle);

  const handleSectionTitleDoubleClick = () => {
    setEditingSectionTitle(true);
    setSectionTitleInput(sectionTitle);
  };

  const handleSectionTitleChange = (e) => {
    setSectionTitleInput(e.target.value);
  };

  const handleSectionTitleSave = () => {
    setSectionTitle(sectionTitleInput);
    setEditingSectionTitle(false);
  };

  return (
    <section className={`py-10 ${backgroundClass}`}>
      {editingSectionTitle ? (
        <input
          value={sectionTitleInput}
          onChange={handleSectionTitleChange}
          onBlur={handleSectionTitleSave}
          autoFocus
          className={`text-3xl font-semibold text-center mb-6 ${textClass}`}
        />
      ) : (
        <h2
          className={`text-3xl font-semibold text-center mb-6 ${textClass}`}
          onDoubleClick={handleSectionTitleDoubleClick}
        >
          {sectionTitle}
        </h2>
      )}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.imgSrc} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              {editingKey && editingKey.key === index && editingKey.field === 'title' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className={`font-bold text-xl ${textClass}`}
                />
              ) : (
                <h3
                  className={`font-bold text-xl ${textClass}`}
                  onDoubleClick={() => handleDoubleClick(index, 'title')}
                >
                  {product.title}
                </h3>
              )}
              {editingKey && editingKey.key === index && editingKey.field === 'description' ? (
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className={`text-gray-600 ${textClass}`}
                />
              ) : (
                <p
                  className={`text-gray-600 ${textClass}`}
                  onDoubleClick={() => handleDoubleClick(index, 'description')}
                >
                  {product.description}
                </p>
              )}
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ textClass }) => {
  const [footerText, setFooterText] = useState('© 2024 Samsung. All rights reserved.');
  const [editingKey, setEditingKey] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedFooterText = localStorage.getItem('footerText');
    if (savedFooterText) {
      setFooterText(savedFooterText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('footerText', footerText);
  }, [footerText]);

  const handleDoubleClick = () => {
    setEditingKey('footer');
    setInputValue(footerText);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setFooterText(inputValue);
    setEditingKey(null);
  };

  return (
    <footer className={`bg-black text-white text-center py-4 ${textClass}`}>
      {editingKey === 'footer' ? (
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
          className=" p-2 text-black"
        />
      ) : (
        <p onDoubleClick={handleDoubleClick}>{footerText}</p>
      )}
    </footer>
  );
};

// Main Samsung Template Component
const Template1 = () => {
  const [backgroundClass, setBackgroundClass] = useState('');
  const [textClass, setTextClass] = useState('');

  // Load custom classes from localStorage (if needed)
  useEffect(() => {
    const savedBackgroundClass = localStorage.getItem('backgroundClass');
    const savedTextClass = localStorage.getItem('textClass');
    if (savedBackgroundClass) setBackgroundClass(savedBackgroundClass);
    if (savedTextClass) setTextClass(savedTextClass);
  }, []);

  // Save custom classes to localStorage (if needed)
  useEffect(() => {
    localStorage.setItem('backgroundClass', backgroundClass);
    localStorage.setItem('textClass', textClass);
  }, [backgroundClass, textClass]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <Navbar backgroundClass={backgroundClass} textClass={textClass} />

      {/* Hero Section */}
      <HeroSection backgroundClass={backgroundClass} textClass={textClass} />

      {/* Product Showcase Section */}
      <ProductShowcase backgroundClass={backgroundClass} textClass={textClass} />

      {/* Footer Section */}
      <Footer textClass={textClass} />
    </div>
  );
};

export default Template1;
