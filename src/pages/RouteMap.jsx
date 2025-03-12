import { useState, useEffect } from "react";

const RouteMap = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    script.onload = () => initMap();
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 30.7333, lng: 76.7794 },
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
    initMap();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">CTU Route Map</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={fetchRoute} className="bg-blue-500 text-white px-4 py-2 rounded">
          Show Route
        </button>
      </div>
      <div id="map" className="h-96 w-full border"></div>
    </div>
  );
};

export default RouteMap;