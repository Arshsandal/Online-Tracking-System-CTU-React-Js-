import React from 'react';
import Navbar from '../components/Navbar';

const Help = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a2e53f] via-[#a2e53f] to-[#a2e53f]">
        {/* Top SVG Background */}
        <div className="absolute top-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-32"
          >
            <path
              fill="#a2e53f"
              fillOpacity="0.1"
              d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,154.7C840,160,960,192,1080,192C1200,192,1320,160,1380,138.7L1440,117V320H0Z"
            ></path>
          </svg>
        </div>

        {/* Dotted Pattern SVG */}
        <div className="absolute top-10 left-10 opacity-20">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="dots"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
            <rect width="200" height="200" fill="url(#dots)" />
          </svg>
        </div>

        {/* Grid Lines Background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10 0 L0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content Wrapper */}
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-lg opacity-90">
              Find answers, explore guides, and get technical assistance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full max-w-lg px-4 py-3 rounded-lg shadow-lg border-none focus:outline-none focus:ring-4 focus:ring-white bg-white bg-opacity-80 backdrop-blur-md text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Help Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Getting Started", desc: "Learn how to use our platform efficiently.", link: "/getting-started" },
              { title: "FAQs", desc: "Common questions and answers.", link: "/faqs" },
              { title: "Technical Support", desc: "Facing issues? Get troubleshooting steps here.", link: "/tech-support" },
              { title: "Contact Support", desc: "Need help? Talk to our team.", link: "/contact-support" },
              { title: "Security & Privacy", desc: "Learn how we protect your data.", link: "/security" },
              { title: "Community Forum", desc: "Connect with other users, share ideas, and discuss.", link: "/forum" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-indigo-700">{item.title}</h2>
                <p className="text-gray-700 mt-2">{item.desc}</p>
                <a href={item.link} className="text-indigo-500 mt-4 block hover:underline">
                  Learn More →
                </a>
              </div>
            ))}
          </div>

          {/* Support Ticket Form */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Submit a Ticket</h2>
            <p className="text-gray-700 mb-4">
              Describe your issue, and our team will assist you as soon as possible.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                placeholder="Describe your issue..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                required
              ></textarea>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                Submit Ticket
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-white opacity-80">
            <p>&copy; 2025 CTU Online Tracking System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;