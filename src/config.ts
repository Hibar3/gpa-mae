/** configure your google api key here */
export const apiKey: string = process.env.REACT_APP_API_KEY || "";
export const apiEndpoint = {
  autocomplete: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
  geocode: `https://maps.googleapis.com/maps/api/geocode/json`
};
