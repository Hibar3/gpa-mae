import React, { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import Header from "./Components/Header";
import CustomMap from "./Containers/Map";
import SearchHistory from "./Containers/SearchHistory";
import { apiKey } from "./config";

const App: React.FC = () => {
  //=====HOOKS
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  const [loading, setLoading] = useState(false);

  //======VARIABLE
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  //======HELPERS
  const handleAddress = ({ description }) => {
    geocodeByAddress(description)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log("Successfully got latitude and longitude", { lat, lng })
      )
      .catch((error) => console.error(error));
  };

  //===========VIEW
  return (
    <div style={{ flex: 1 }}>
      <Header />
      <h2>Discover places</h2>
      <div style={{ height: "100vh", width: "100%" }}>
        <CustomMap isLoaded={isLoaded} />
        <div
          style={{
            justifyContent: "center",
            margin: 20,
          }}
        >
          <SearchHistory isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  );
};

export default App;
