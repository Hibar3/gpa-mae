import * as types from "./types";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../common/history";

const INITIAL_STATE_PLACES = {
  description: "Kuala Lumpur",
  places: [],
  error: null,
};

const INITIAL_STATE_GEOCODE = {
  searchTerm: {
    address: "Kuala Lumpur",
    placeId: "",
    latLng: [],
    error: null,
    coords: [],
  },
};

const placesReducer = (
  state = INITIAL_STATE_PLACES,
  action: { type; payload }
) => {
  switch (action.type) {
    case types.FETCH_PLACES_SUCCESS: {
      const searchHistory = [action.payload?.searchTerm, ...state.places];
      return {
        ...state,
        description: action.payload?.searchTerm?.description,
        places: searchHistory,
      };
    }

    case types.FETCH_PLACES_FAILURE:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};

const geocodingReducer = (
  state = INITIAL_STATE_GEOCODE,
  action: { type; payload }
) => {
  switch (action.type) {
    case types.FETCH_GEO_SUCCESS: {
      console.log("FETCH_GEO_SUCCESS", action?.payload);
      const searchHistory = [
        action.payload?.searchTerm,
        ...state.searchTerm?.coords,
      ];
      return {
        ...state,
        searchTerm: {
          coords: searchHistory,
          address: action.payload?.searchTerm?.address,
          placeId: action.payload?.searchTerm?.placeId,
        },
      };
    }
    case types.FETCH_GEO_FAILURE:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};

export const searchReducer = combineReducers({
  places: placesReducer,
  geoCode: geocodingReducer,
  router: connectRouter(history),
});

export const reducers = {
  searches: searchReducer,
};

export const rootReducer = combineReducers(reducers);
