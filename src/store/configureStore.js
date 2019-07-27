import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../store/reducers/auth";
import signupReducer from "../store/reducers/signup";
import sellReducer from "../store/reducers/sell";
import buyReducer from "../store/reducers/buy";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  sell: sellReducer,
  buy: buyReducer
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
