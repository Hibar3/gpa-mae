import * as types from "./types";

export const fetchPlaces = (searchTerm) => {
  console.log("fetchPlaces", searchTerm);
  return { type: types.FETCH_PLACES, payload: { searchTerm } };
};
export const fetchPlacesSuccess = (searchTerm) => {
  console.log("fetchPlacesSuccess", searchTerm);
  return {
    type: types.FETCH_PLACES_SUCCESS,
    payload: { searchTerm },
  };
};

export const fetchPlacesFailure = (error, places) => ({
  type: types.FETCH_PLACES_FAILURE,
  payload: { error, places },
});

export const fetchGeo = (address) => ({
  type: types.FETCH_GEO,
  payload: { address },
});
export const fetchGeoSuccess = (GEO) => ({
  type: types.FETCH_GEO_SUCCESS,
  payload: { GEO },
});

export const fetchGeoFailure = (error, places) => ({
  type: types.FETCH_GEO_FAILURE,
  payload: { error, places },
});

// export function updateSearches(data) {
//   console.log({ data });
//   return (dispatch) => {
//     dispatch({
//       type: 'UPDATE_SEARCHES',
//       payload: data,
//     });
//   };
// }
