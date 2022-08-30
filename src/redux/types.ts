import { Action } from "redux";
import { PayloadedAction } from "../common/types";

export const FETCH_PLACES = "FETCH_PLACES";
export const FETCH_PLACES_SUCCESS = "FETCH_PLACES_SUCCESS";
export const FETCH_PLACES_FAILURE = "FETCH_PLACES_FAILURE";
export const ON_RESET = "ON_RESET";

export const FETCH_GEO = "FETCH_GEO";
export const FETCH_GEO_SUCCESS = "FETCH_GEO_SUCCESS";
export const FETCH_GEO_FAILURE = "FETCH_GEO_FAILURE";

export interface GoogleMapProps {
  apiKey: string;
  height: string;
  searchPlaceHolder?: string;
  overridePlace?: BasePlaceResult;
  onPlaceChanged?: (placeResult: PlaceResult) => void;
}

export interface BasePlaceResult {
  description: string;
  place_id: string;
}

export interface PlaceResult extends BasePlaceResult {
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  reference: string;
  types: string[];
}

export type HistoryPlaceResult = {payload: BasePlaceResult};
export type InterestPlaceResult = BasePlaceResult;

export interface SearchMapState {
  searchHistoryPlaces: HistoryPlaceResult[];
  interestPlaces: InterestPlaceResult[];
  isInterestPlacesLoading: boolean;
  interestPlacesLoadError: string;
}

export type SearchMapActions =
  | PayloadedAction<'FETCH_PLACES_SUCCESS', HistoryPlaceResult>
  | Action<typeof FETCH_PLACES_SUCCESS>
  | Action<typeof FETCH_PLACES_FAILURE>
  | Action<typeof FETCH_GEO>
  | Action<typeof FETCH_GEO_SUCCESS>
  | Action<typeof FETCH_GEO_FAILURE>
  | Action<typeof ON_RESET>
