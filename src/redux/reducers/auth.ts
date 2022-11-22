import { AnyAction } from "redux";
import { ACTIONS } from "../constans";
export interface IAuthState {
  setError: string;
}
export const defaultState: IAuthState = {
  setError: "",
};
export const authReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        setError: action.error,
      };
    default:
      return state;
  }
};
