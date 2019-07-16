import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../store/reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    authReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;
