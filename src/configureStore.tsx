import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { rootEpic } from "./redux/root";
import { rootReducer } from "./redux/reducer";
import { epicsMiddleware, loggerMiddleware } from "./middlewares";
import history from "./common/history";

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootStore = () => {
  const reduxMiddleware = applyMiddleware(epicsMiddleware, loggerMiddleware);
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    enhancers: [
      composeWithDevTools(applyMiddleware(epicsMiddleware, loggerMiddleware)),
    ],
    middleware: [thunk, routerMiddleware(history)],
  });

  setTimeout(() => {
    epicsMiddleware.run(rootEpic);
  }, 2000);

  return store;
};

export default rootStore;

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
