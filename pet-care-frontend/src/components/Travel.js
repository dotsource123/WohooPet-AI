import React, { useState } from "react";
import "./TravelLocations.css";
import travelBg from "../assets/images/travel-bg.png";

const TravelLocations = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async () => {
    if (!city.trim()) {
      setPlaces([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/travel/travel-spots?city=${encodeURIComponent(city)}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch travel spots");
      }
      const data = await res.json();
      setPlaces(data.features || []);
    } catch (err) {
      console.error(err);
      setPlaces([]);
    }

    setLoading(false);
  };

  return (
    <div
      className="travel-container"
      style={{
        backgroundImage: `url(${travelBg})`,
      }}
    >
      <div className="travel-overlay">
        <h2>🌍 Explore Pet-Friendly Travel Spots</h2>
        <div className="travel-input">
          <input
            type="text"
            placeholder="Enter city name e.g. Delhi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchPlaces}>Find Spots</button>
        </div>

        {loading && <p>Loading travel spots for your pet...</p>}

        <div className="travel-grid">
          {places.length > 0 ? (
            places.map((place, idx) => (
              <div key={idx} className="travel-card">
                <h3>{place.properties.name || "Unnamed Park"}</h3>
              </div>
            ))
          ) : (
            !loading && city.trim() !== "" && (
      <p>No spots found for "{city}". Try another city!</p>
    )
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelLocations;
