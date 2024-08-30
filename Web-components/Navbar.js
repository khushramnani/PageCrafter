import React from 'react';

const Navbar = ({ backgroundColor, textColor }) => {
  const navbarStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-gray-900" style={navbarStyle}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="ml-3 text-2xl font-semibold dark:text-white">Flowbite</span>
        </a>
        <div className="flex">
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="text-blue-700 dark:text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-700">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-700">Services</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-700">Pricing</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;