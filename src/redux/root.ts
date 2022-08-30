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

// epic
export const fetchPlacesEpic = (action$, state) => {
  console.log("action:", action$);
  return action$.pipe(
    ofType(types.FETCH_PLACES),
    tap((value) => console.log("Gonna fetch", value)),
    mergeMap((value) => {
      console.log("line 58", value);
      return value.payload;
    })
  );
};

// combine root and export
export const rootEpic = combineEpics(fetchPlacesEpic);
