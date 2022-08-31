import * as types from "./types";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../common/history";
import { GeoAction, InitStateGeo, InitStatePlaces, PlaceAction } from "./types";

const INITIAL_STATE_PLACES: InitStatePlaces = {
  description: "Kuala Lumpur",
  places: [],
  error: null,
};

const INITIAL_STATE_GEOCODE: InitStateGeo = {
  searchTerm: {
    address: "Kuala Lumpur",
    placeId: "",
    latLng: [],
    error: null,
    coords: [],
  },
};

const placesReducer = (state = INITIAL_STATE_PLACES, action: PlaceAction) => {
  switch (action.type) {
    case types.FETCH_PLACES_SUCCESS: {
      const searchHistory = [action.payload?.searchTerm, ...state?.places];
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

const geocodingReducer = (state = INITIAL_STATE_GEOCODE, action: GeoAction) => {
  switch (action.type) {
    case types.FETCH_GEO_SUCCESS: {
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
