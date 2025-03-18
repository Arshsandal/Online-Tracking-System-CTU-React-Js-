import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#a2e53f] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Copyright and Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-sm">&copy; Chandigarh Transport Undertaking. All Rights Reserved.</p>
          </div>

                  {/* Optional: Social Media Icons Section */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-gray-800">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-800">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-800">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

          {/* Right Section: Links */}
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="/privacy" className="text-sm hover:text-gray-800 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-gray-800 transition-colors">Terms of Service</a>
            <a href="/contact" className="text-sm hover:text-gray-800 transition-colors">Contact Us</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
