import { configureStore } from "@reduxjs/toolkit";
import { Action, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk, { ThunkAction } from "redux-thunk";
import { rootEpic } from "./redux/root";
import { rootReducer } from "./redux/reducer";
import { epicsMiddleware, loggerMiddleware } from "./middlewares";
import history from "./common/history";

const initialState = {};

const reduxMiddleware = applyMiddleware(epicsMiddleware, loggerMiddleware);
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  enhancers: [composeWithDevTools(reduxMiddleware)],
  middleware: [thunk, routerMiddleware(history)],
});

epicsMiddleware.run(rootEpic);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
