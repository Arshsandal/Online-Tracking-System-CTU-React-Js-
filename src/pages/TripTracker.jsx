import { useEffect, useState } from "react";
import api from "../api/formatted_bus_routes.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const TripTracker = () => {
  const [ctuRoutes, setCtuRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      setCtuRoutes(api);
      setLoading(false);
    } catch (err) {
      console.error("Data Error:", err.message);
      setError("Failed to load routes.");
      setLoading(false);
    }
  }, []);

  const filteredRoutes = ctuRoutes.filter((route) =>
    route.route_number.includes(search) ||
    route.start.toLowerCase().includes(search.toLowerCase()) ||
    route.end.toLowerCase().includes(search.toLowerCase()) ||
    route.via.some((station) => station.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden p-8 border border-gray-200">
          <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-6" style={{ color: "#a2e53f" }}>
            🚍 Real-Time Public Transport Tracker
          </h3>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 mb-6 shadow-sm w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search route, location..."
              className="w-full px-4 py-2 bg-transparent text-gray-900 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Loading & Error Handling */}
          {loading && <p className="text-gray-600 text-center animate-pulse">Fetching live data...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Route Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-50 border p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                    style={{ borderColor: "#a2e53f" }}
                  >
                    <h4 className="text-lg font-bold text-gray-800 flex justify-between" style={{ color: "#a2e53f" }}>
                      🚌 Route {route.route_number}
                      <span className="text-sm text-gray-600">#{index + 1}</span>
                    </h4>
                    <p className="text-gray-700 mt-1 font-medium">
                      📍 {route.start} ➝ {route.end}
                    </p>
                    {route.via.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <strong>Via:</strong> {route.via.join(", ")}
                      </p>
                    )}
                    <button className="mt-3 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition shadow-md transform hover:scale-105" style={{ backgroundColor: "#a2e53f" }}>
                      Check Live Status 📍
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center w-full col-span-2">No matching routes found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    <Footer />
    </>
  );
};

export default TripTracker;