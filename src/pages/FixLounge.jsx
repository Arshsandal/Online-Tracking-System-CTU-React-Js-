import React from 'react';
import Navbar from '../components/Navbar'; // Import your Navbar component
import Svg from '../components/Svg'; // Import your Svg component (if you have one)
import Copyright from '../components/Copyright'; // Import your Copyright component

const FixLounge = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a2e53f] via-[#a2e53f] to-[#a2e53f]">
        <Svg /> {/* Assuming this is a background SVG component */}
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Fix Lounge</h1>
            <p className="text-lg opacity-90">
              Relax in our comfortable and well-equipped lounges across the city.
            </p>
          </div>

          {/* Lounge Services Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[ 
              { title: "Premium Seating", desc: "Enjoy our premium, ergonomic seating for maximum comfort.", link: "/lounge/premium-seating" },
              { title: "Free Wi-Fi", desc: "Stay connected with free high-speed Wi-Fi throughout the lounge.", link: "/lounge/wifi" },
              { title: "Refreshments", desc: "Complimentary snacks and beverages to keep you refreshed.", link: "/lounge/refreshments" },
              { title: "Power Stations", desc: "Charging stations for all your devices, so you're always powered up.", link: "/lounge/power-stations" },
              { title: "Lounge Ambiance", desc: "A relaxing ambiance with comfortable lighting and music for a peaceful atmosphere.", link: "/lounge/ambiance" },
              { title: "VIP Access", desc: "Exclusive VIP access to premium areas for a higher level of comfort.", link: "/lounge/vip" }
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

          {/* Book a Lounge Section */}
          <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg p-8 mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Your Spot</h2>
            <p className="text-gray-700 mb-4">
              Reserve your seat at our Fix Lounge to enjoy all the premium facilities.
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
              <input
                type="date"
                placeholder="Preferred Date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
                Book Your Lounge Spot
              </button>
            </form>
          </div>

          {/* FAQs Section */}
          <div className="mt-10">
            <h2 className="text-3xl text-white font-semibold text-green-600">Frequently Asked Questions</h2>
            <div className="space-y-4 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">How can I book a spot at the Fix Lounge?</h3>
                <p className="mt-2 text-gray-600">You can easily book your spot via our website. Just fill in the required details and select your preferred date.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">What services are included in the lounge experience?</h3>
                <p className="mt-2 text-gray-600">The lounge offers premium seating, free Wi-Fi, refreshments, power stations, and more for a comfortable experience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">Is the Fix Lounge accessible to all passengers?</h3>
                <p className="mt-2 text-gray-600">Yes, all passengers can access the lounge, but VIP areas and premium facilities are available for upgraded bookings.</p>
              </div>
            </div>
          </div>

          <Copyright />
        </div>
      </div>
    </>
  );
};

export default FixLounge;
