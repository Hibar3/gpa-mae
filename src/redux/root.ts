import { combineEpics, ofType } from "redux-observable";
import { mergeMap, tap } from "rxjs/operators";
import * as types from "./types";
import { handleAddress } from "../utils";

// epic
export const fetchPlacesEpic = (action$, state) => {
  return action$.pipe(
    ofType(types.FETCH_GEO_SUCCESS),
    tap((value) => console.log("Gonna fetch", value)),
    mergeMap(async ({ payload }) => handleAddress(payload?.searchTerm?.placeId))
  );
};

// combine root and export
export const rootEpic = combineEpics(fetchPlacesEpic);
