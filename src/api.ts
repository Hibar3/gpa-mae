import axios from "axios";
import { PlaceType } from "./Components/Autocomplete/props";
import { apiEndpoint, apiKey } from "./config";

export const postAutocomplete = async (input?: string) => {
  const data = await axios
    .post(`${apiEndpoint.autocomplete}?key=${apiKey}&input${input}`)
    .then((res) => console.log(res))
    .catch((err) => `Error ${err}`);
  return data;
};

export const postGeocode = async (input?: string) => {
  const data = await axios
    .post(`${apiEndpoint.autocomplete}?key=${apiKey}&place_id${input}`)
    .then((res) => console.log(res))
    .catch((err) => `Error ${err}`);
  return data;
};

// A mock function to mimic making an async request for data
export const getAutocomplete = async (
  action,
  request?: { input: string },
  callback?: (results?: readonly PlaceType[]) => void
) => {
  // to get google maps predictions
  const res = (action as any).getPlacePredictions(request, callback);
  return res;
};
