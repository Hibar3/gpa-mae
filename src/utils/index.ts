import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";

export const handleAddress = (placeId: string) => {
  geocodeByPlaceId(placeId)
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log("Successfully got latitude and longitude", { lat, lng });
    })
    .catch((error) => console.error(error));
};
