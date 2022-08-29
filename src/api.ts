import axios from "axios";
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
