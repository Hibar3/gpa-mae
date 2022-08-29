// @ts-nocheck - may need to be at the start of file
import { combineEpics, ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import {
  takeUntil,
  mergeMap,
  catchError,
  map,
  tap,
  filter,
  mapTo,
  delay,
} from "rxjs/operators";
import * as actions from "./actions";
import * as types from "./types";
import { apiEndpoint, apiKey } from "../config";

const pingEpic = (action$) =>
  action$.pipe(
    /** @ts-ignore */
    filter((value) => value?.type === "PING"),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: "PONG" })
  );

const fetchUser = (username) => ({ type: "FETCH_USER", payload: username });
const fetchUserFulfilled = (payload) => ({
  type: "FETCH_USER_FULFILLED",
  payload,
});

// epic
const fetchUserEpic = (action$) =>
  action$.pipe(
    ofType("FETCH_USER"),
    mergeMap((action) =>
      ajax
        .getJSON(`https://reqres.in/api/users?page=2`)
        .pipe(map((response) => fetchUserFulfilled(response)))
    )
  );

export const fetchPlacesEpic = (action$, state) => {
  console.log("action:", action$);
  return action$.pipe(
    ofType(types.FETCH_PLACES),
    tap((value) => console.log("Gonna fetch", value)),
    mergeMap((action) =>
      ajax
        .getJSON(
          `${apiEndpoint.autocomplete}?input=${action?.payload?.searchTerm}&types=geocode&key=${apiKey}`
        )
        .pipe(
          tap((value) => console.log(value)),
          map((res) => actions.fetchPlacesSuccess(res?.predictions)),
          takeUntil(
            action$.pipe(
              tap((value) => console.log("CANCELING", value)),
              ofType(types.FETCH_PLACES)
            )
          ),
          catchError((error) =>
            of(actions.fetchPlacesFailure(error, action?.payload?.isServer))
          )
        )
    )
  );
};

// Must set default state
export const ping = (state = {}, action?) => {
  switch (action?.type) {
    case "PING":
      return {
        ...state,
        test: "Test PING",
      };
    default:
      return state;
  }
};

export const users = (state = {}, action?) => {
  switch (action.type) {
    case "FETCH_USER_FULFILLED":
      return {
        ...state,
        test: "Test reducres",
      };

    default:
      return state;
  }
};

// combine root and export
export const rootEpic = combineEpics(fetchPlacesEpic);
