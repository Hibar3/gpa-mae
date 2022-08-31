import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";
import { Action } from "redux";
import { PayloadedAction, PlaceType } from "../common/types";

export const FETCH_PLACES = "FETCH_PLACES";
export const FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS";
export const FETCH_PLACES_FAILURE = "FETCH_PLACES_FAILURE";
export const ON_RESET = "ON_RESET";

export const FETCH_GEO = "FETCH_GEO";
export const FETCH_GEO_SUCCESS = "FETCH_GEO_SUCCESS";
export const FETCH_GEO_FAILURE = "FETCH_GEO_FAILURE";

export interface PlaceResult extends PlaceType {
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  reference: string;
  types: string[];
}

export type InitStatePlaces = {
  description: string;
  places: PlaceType[];
  error?: string | null;
};
export type InitStateGeo = {
  searchTerm: {
    address: string;
    placeId: string;
    latLng: LatLng[];
    error?: string | null;
    coords: [];
  };
};
export type SearchHistory = { searchTerm: PlaceType };
export type PlaceAction =
  | Action<"FETCH_PLACES">
  | PayloadedAction<"FETCH_PLACES_SUCCESS", SearchHistory>
  | PayloadedAction<"FETCH_PLACES_FAILURE", { error: string }>;

export type GeoAction =
  | Action<"FETCH_GEO">
  | PayloadedAction<"FETCH_GEO_SUCCESS", InitStateGeo>
  | PayloadedAction<"FETCH_GEO_FAILURE", { error: string }>;
