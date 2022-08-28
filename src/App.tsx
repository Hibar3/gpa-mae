import React, { useCallback, useEffect, useRef, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import AutoComplete from "./Components/Autocomplete";
import Header from "./Components/Header";
import CustomMap from "./Containers/Map";

const App: React.FC = () => {
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
    <div>
      <Header />
      <h2>Discover places</h2>
      {/* <AutoComplete /> */}
      <div style={{ height: "100vh", width: "100%" }}>
        <CustomMap />
      </div>
    </div>
  );
};

export default App;
