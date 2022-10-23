import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer, IAuthState } from "./reducers/auth";

import { categoryReducer, ICategoryState } from "./reducers/category";

export interface TState {
  categoryReducer: ICategoryState;
  authReducer: IAuthState;
}
export let store = createStore(
  combineReducers({ categoryReducer, authReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
