import React from 'react';
// import './Footer.css'; // Import the CSS file

const Footer = ({ backgroundColor, textColor, fontSize }) => {
  // Set custom properties for dynamic styles
  document.documentElement.style.setProperty('--footer-text-color', textColor);
  document.documentElement.style.setProperty('--footer-background-color', backgroundColor);
  document.documentElement.style.setProperty('--footer-font-size', fontSize);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
