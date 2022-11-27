import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { categoryReducer, ICategoryState } from "./reducers/category";

export interface TState {
  categoryReducer: ICategoryState;
}
export let store = createStore(
  combineReducers({ categoryReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
