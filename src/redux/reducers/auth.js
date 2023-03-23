// Aca vamos a despachar, las funciones que provengan de login y register.
import { LOGIN, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL } from "../types";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  displayName: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        displayName: action.payload.displayName,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        displayName: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        displayName: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
