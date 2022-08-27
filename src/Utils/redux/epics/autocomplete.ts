import { ajax } from "rxjs/ajax";
import { dispatch } from "rxjs/internal/observable/range";
import { mergeMap, switchMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import map from "lodash/map";
import { apiEndpoint, apiKey } from "../../../config";

// action creators
const fetchPlaces = (search) => ({ type: "INPUT", payload: search });
const fetchUserFulfilled = (payload?) => ({
  type: "OUTPUT",
  payload,
});

// epic
export const autoCompleteEpic = (action$, store?) => {
  action$.pipe(
    ofType("INPUT"),
    mergeMap((action) =>
      ajax.getJSON(`${apiEndpoint}?${action$.payload}&${apiKey}`)
    )
  );
  return ajax.getJSON(`${apiEndpoint}?${action$}&${apiKey}`);
};

// later...
// dispatch(fetchUser("torvalds"));
