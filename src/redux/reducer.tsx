import * as types from "./types";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../common/history";
import { SearchMapActions } from "./types";

const INITIAL_STATE_PLACES = {
  description: "Kuala Lumpur",
  places: [],
  error: null,
};

const INITIAL_STATE_GEOCODE = {
  searchPlaces: {
    address: "malaysia",
    error: null,
    coords: [],
  },
};

const placesReducer = (
  state = INITIAL_STATE_PLACES,
  action: { type; payload }
) => {
  console.log("line 21 acton", action);
  switch (action.type) {
    case types.FETCH_PLACES_SUCCESS: {
      const searchHistory = [action.payload?.searchTerm, ...state.places];
      console.log("history", searchHistory);
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

const geocodingReducer = (state = INITIAL_STATE_GEOCODE, { type, payload }) => {
  switch (type) {
    case types.FETCH_GEO_SUCCESS:
      return {
        ...state,
        coords: payload.coords,
      };
    case types.FETCH_GEO_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export const searchesReducer = combineReducers({
  places: placesReducer,
  coords: geocodingReducer,
  router: connectRouter(history),
});

export const reducers = {
  searches: searchesReducer,
};

export const rootReducer = combineReducers(reducers);
