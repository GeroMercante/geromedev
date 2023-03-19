import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import authReducer from './redux/reducers/auth';

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  // reducers desde la carpeta redux/reducer
  auth: authReducer,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
