import React from 'react';
import Navbar from '../components/Navbar';
import Svg from '../components/Svg';
import Copyright from '../components/Copyright';
import Footer from '../components/Footer';

const Help = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a2e53f] via-[#a2e53f] to-[#a2e53f]">
      <Svg />
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-lg opacity-90">
              Find answers, explore guides, and get technical assistance.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full max-w-lg px-4 py-3 rounded-lg shadow-lg border-none focus:outline-none focus:ring-4 focus:ring-white bg-white bg-opacity-80 backdrop-blur-md text-gray-700 placeholder-gray-500"
            />
          </div>
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
          <Copyright />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;