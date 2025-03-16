import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const RouteMap = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add Google Maps script to the page
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`; // Replace with your API key
    script.async = true;
    script.onload = () => {
      setLoading(false);
      initMap();  // Initialize the map when the script is loaded
    };
    document.body.appendChild(script);
    setLoading(true); // Set loading state when the script starts loading
  }, []);

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 30.7333, lng: 76.7794 }, // Default location (Chandigarh)
      zoom: 13,
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (route.length > 0) {
      const waypoints = route.map((point) => ({ location: new google.maps.LatLng(point.lat, point.lng) }));
      directionsService.route(
        {
          origin: startLocation,
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            console.error("Directions request failed due to", status);
          }
        }
      );
    }
  };

  const fetchRoute = () => {
    setRoute([
      { lat: 30.7333, lng: 76.7794 }, // Chandigarh
      { lat: 30.741482, lng: 76.768066 },
      { lat: 30.7500, lng: 76.7800 },
    ]);
    initMap();  // Reinitialize the map with new route
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">CTU Route Map</h2>
        <div className="flex gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Start Location"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="p-3 border rounded-md w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 border rounded-md w-1/3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchRoute}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            Show Route
          </button>
        </div>
        
        {loading && <div className="text-center text-lg text-gray-600">Loading map...</div>}

        {/* Embed the map using iframe, responsive width */}
        <div className="text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.197454309!2d76.77071360000001!3d30.732280449999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1742136742289!5m2!1sen!2sin"
            width="100%"  // Full width of its container
            height="450"
            style={{ border: 0, maxWidth: "100%" }} // Ensure it's responsive and doesn't exceed the container width
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default RouteMap;
