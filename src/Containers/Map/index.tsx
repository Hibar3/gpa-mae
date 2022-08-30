import React, { useCallback, useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { apiKey } from "../../config";
import { Props } from "./props";

const containerStyle = {
  width: "50%",
  height: "500px",
};
const center = { lat: -34.397, lng: 150.64 };

export const CustomMap: React.FC<Props> = (props) => {
  //======VARIABLE
  const { isLoaded } = props;
  const zoom = 5;

  //======STATES
  const [map, setMap] = useState(null);
  // const center = useMemo(() => ({ lat: 45, lng: -80 }), []);
  const onLoad = useCallback(function callback(value) {
    const bounds = new window.google.maps.LatLngBounds(center);
    value.fitBounds(bounds);
    setMap(value);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceChanged = (value?) => {
    console.log(value);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default CustomMap;
