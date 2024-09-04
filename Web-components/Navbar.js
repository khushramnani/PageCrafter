import React from 'react';

const Navbar = ({ backgroundColor, textColor, fontSize }) => {
  const navbarStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    fontSize: fontSize,
  };

  return (
    <nav className="w-full dark:bg-gray-900" style={navbarStyle}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="/" className="flex items-center" style={{ color: textColor }}>
          <span className="ml-3 text-sm font-semibold">PageCrafter</span>
        </a>
        <div className="flex">
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="no-underline" style={{ color: textColor }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="no-underline" style={{ color: textColor }}>
                About
              </a>
            </li>
            <li>
              <a href="#" className="no-underline" style={{ color: textColor }}>
                Services
              </a>
            </li>
            <li>
              <a href="#" className="no-underline" style={{ color: textColor }}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="no-underline" style={{ color: textColor }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
