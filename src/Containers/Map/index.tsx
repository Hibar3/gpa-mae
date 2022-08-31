import React, { useCallback, useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Props } from "./props";

const containerStyle = {
  width: "98%",
  height: "500px",
};
const center = { lat: -34.397, lng: 150.644 };

export const CustomMap: React.FC<Props> = (props) => {
  //======VARIABLE
  const { isLoaded, position, style } = props;
  const zoom = 4;

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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={style || containerStyle}
      center={position || center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF position={position || center} />
    </GoogleMap>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default CustomMap;
