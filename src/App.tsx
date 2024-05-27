import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import SearchHistory from "./Containers/SearchHistory";
import CustomMap from "./Containers/Map";
import Header from "./Components/Header";
import { apiKey } from "./config";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";

const App: React.FC = () => {
  //=====HOOKS
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });
  const [position, setPosition] = useState({ lat: -34.397, lng: 150.644 });

  //======EVENTS
  const onPlaceChanged = (value) => setPosition(value);
  const onPressAddress = (placeId: string) => {
    geocodeByPlaceId(placeId)
      .then((results) => getLatLng(results[0]))
      .then((res) => setPosition(res))
      .catch((error) => console.error(error));
  };

  //===========VIEW
  return (
    <div>
      <Header />
      <Container maxWidth={false}>
        <h2>Discover places</h2>
        <div style={{ height: "100vh", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <div style={{ margin: 5 }}>
                <CustomMap isLoaded={isLoaded} position={position} />
              </div>
            </Grid>
            <Grid xs={4}>
              <SearchHistory
                isLoaded={isLoaded}
                onPressAddress={onPressAddress}
                onPlaceChanged={onPlaceChanged}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default App;
