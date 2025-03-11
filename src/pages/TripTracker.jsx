import { useEffect, useState } from "react";
import api from "../api/formatted_bus_routes.json";
import Navbar from "../components/Navbar"

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
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden p-8 border border-gray-300">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 text-center">
          🚍 Public Transport Routes
        </h3>

        {/* Search Bar */}
        <div className="mt-4 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search by route number, start or end..."
            className="w-full max-w-lg px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="text-gray-600 mt-6 text-center">Loading routes...</p>}
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}

        {/* Route Cards */}
        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route, index) => (
                <div
                  key={index}
                  className="p-5 bg-gradient-to-r from-blue-50 to-gray-100 shadow-lg rounded-lg border border-gray-200 transition hover:shadow-xl"
                >
                  <h4 className="text-lg font-semibold text-gray-900 flex justify-between">
                    <span>🚌 Route {route.route_number}</span>
                    <span className="text-sm text-gray-600">#{index + 1}</span>
                  </h4>
                  <p className="text-gray-700 mt-1 font-medium">
                    {route.start} ➝ {route.end}
                  </p>
                  {route.via.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Via:</strong> {route.via.join(", ")}
                    </p>
                  )}
                  {/* Check Status Button */}
                  <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition">
                    Check Status 📍
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No matching routes found.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TripTracker;
