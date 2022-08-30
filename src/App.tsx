import React, { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import Header from "./components/Header";
import CustomMap from "./containers/Map";
import SearchHistory from "./containers/SearchHistory";
import { apiKey } from "./config";

const center = { lat: -34.397, lng: 150.644 };

const App: React.FC = () => {
  //=====HOOKS
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  const [position, setPosition] = useState(center);
  console.log(position);

  //======EVENTS
  const handlePosition = (value) => {
    setPosition(value);
  };

  //===========VIEW
  return (
    <div style={{ flex: 1 }}>
      <Header />
      <h2>Discover places</h2>
      <div style={{ height: "100vh", width: "100%" }}>
        <CustomMap isLoaded={isLoaded} position={position} />
        <div
          style={{
            justifyContent: "center",
            margin: 20,
          }}
        >
          <SearchHistory isLoaded={isLoaded} onPlaceChanged={handlePosition} />
        </div>
      </div>
    </div>
  );
};

export default App;
