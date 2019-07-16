import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  name: null,
  email: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.JWT,
        userId: action.authData.user_id,
        name: action.authData.name,
        email: action.authData.email,
        error: null,
        loading: false
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
};

export default reducer;
