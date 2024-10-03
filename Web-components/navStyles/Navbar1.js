import React from 'react';
import {useState , useEffect} from 'react';

const Navbar1 = ({ backgroundColor, textColor, fontSize }) => {
  const backgroundClass = backgroundColor ? `bg-[${backgroundColor}]` : '';
  const textClass = textColor ? `text-[${textColor}]` : '';
  const fontSizeClass = fontSize ? `text-[${fontSize}]` : '';

  const [navbarText, setNavbarText] = useState({
    brand: 'Navbar',
    home: 'Home',
    About: "About",
    Services: "Services",
    Pricing: "Pricing",
    Contact: "Contact",
    Brand: "PageCrafter",
    
  });

  const [editingKey, setEditingKey] = useState(null); // Track which text is being edited
  const [inputValue, setInputValue] = useState(''); // Track the value of the input while editing

  // Load text from local storage when the component mounts
  useEffect(() => {
    const savedText = JSON.parse(localStorage.getItem('navbarText'));
    if (savedText) {
      setNavbarText(savedText);
    }
  }, []);

  // Save text to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('navbarText', JSON.stringify(navbarText));
  }, [navbarText]);

  // Enable editing for a specific key
  const handleDoubleClick = (key) => {
    setEditingKey(key);
    setInputValue(navbarText[key]); // Set the current value of the input field
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Save the edited value on blur or Enter key
  const handleSave = () => {
    setNavbarText((prev) => ({ ...prev, [editingKey]: inputValue }));
    setEditingKey(null); // Exit editing mode
  };

  return (
    <nav className={`w-full ${backgroundClass}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <li href="/" className={`flex items-center ${textClass}`}>
        {editingKey === 'Brand' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline font-bold  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('Brand')} href="#">
                {navbarText.Brand}
              </span>
            )}
        </li>
        <div className="flex">
          <ul className="flex space-x-8">
            <li className={`${textClass}`}>
              <li href="#" className={`no-underline ${textClass} ${fontSizeClass}`}>
              {editingKey === 'home' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('home')} href="#">
                {navbarText.home}
              </span>
            )}
              </li>
            </li>
            <li>
              <li href="#" className={`no-underline ${textClass} ${fontSizeClass}`}>
              {editingKey === 'About' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('About')} href="#">
                {navbarText.About}
              </span>
            )}
              </li>
            </li>
            <li>
              <li href="#" className={`no-underline ${textClass} ${fontSizeClass}`}>
              {editingKey === 'Services' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('Services')} href="#">
                {navbarText.Services}
              </span>
            )}
              </li>
            </li>
            <li>
              <li href="#" className={`no-underline ${textClass} ${fontSizeClass}`}>
              {editingKey === 'Pricing' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('Pricing')} href="#">
                {navbarText.Pricing}
              </span>
            )}
              </li>
            </li>
            <li>
              <li href="#" className={`no-underline ${textClass} ${fontSizeClass}`}>
              {editingKey === 'Contact' ? (
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleSave}
                  autoFocus
                  className=" w-[50%] p-2 "
                />
              ) : (
                <span className={`"no-underline  "${textClass}`} aria-current="page" onDoubleClick={() => handleDoubleClick('Contact')} href="#">
                {navbarText.Contact}
              </span>
            )}
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
