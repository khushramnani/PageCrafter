import React from 'react';

const Footer = ({ backgroundColor, textColor, fontSize }) => {
  const backgroundClass = backgroundColor ? `bg-[${backgroundColor}]` : '';
  const textClass = textColor ? `text-[${textColor}]` : '';
  const fontSizeClass = fontSize ? `text-[${fontSize}]` : '';
  return (
    <>
    <footer
      className={`py-10 px-5 font-sans ${backgroundClass} ${textClass} ${fontSizeClass}`}

    >
      <div className="flex flex-wrap justify-between">
        <div className="flex-1 min-w-[200px] mr-5">
          <h4 className="mb-4" style={{ fontSize: fontSize }}>About Us</h4>
          <p className="leading-relaxed" style={{ fontSize: fontSize }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
        <div className="flex-1 min-w-[200px] mr-5">
          <h4 className="mb-4" style={{ fontSize: fontSize }}>Contact</h4>
          <p style={{ fontSize: fontSize }}>Email: info@example.com</p>
          <p style={{ fontSize: fontSize }}>Phone: +123 456 7890</p>
        </div>
        <div className="flex-1 min-w-[200px]">
          <h4 className="mb-4" style={{ fontSize: fontSize }}>Follow Us</h4>
          <ul className="list-none p-0">
            <li className="inline mr-3">
              <a href="#" className="no-underline hover:underline" style={{ color: textColor, fontSize: fontSize }}>
                Facebook
              </a>
            </li>
            <li className="inline mr-3">
              <a href="#" className="no-underline hover:underline" style={{ color: textColor, fontSize: fontSize }}>
                Twitter
              </a>
            </li>
            <li className="inline">
              <a href="#" className="no-underline hover:underline" style={{ color: textColor, fontSize: fontSize }}>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-5 mt-5 border-t border-gray-700">
        <p style={{ fontSize: fontSize }}>
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  );
};

export default Footer;
