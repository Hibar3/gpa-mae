import * as types from "./types";

export const fetchPlaces = (searchTerm) => ({
  type: types.FETCH_PLACES,
  payload: { searchTerm },
});
export const fetchPlacesSuccess = (searchTerm) => ({
  type: types.FETCH_PLACES_SUCCESS,
  payload: { searchTerm },
});

export const fetchPlacesFailure = (error, places) => ({
  type: types.FETCH_PLACES_FAILURE,
  payload: { error, places },
});

export const fetchGeo = (searchTerm) => ({
  type: types.FETCH_GEO,
  payload: { searchTerm },
});
export const fetchGeoSuccess = (searchTerm) => ({
  type: types.FETCH_GEO_SUCCESS,
  payload: { searchTerm },
});

export const fetchGeoFailure = (error, places) => ({
  type: types.FETCH_GEO_FAILURE,
  payload: { error, places },
});
