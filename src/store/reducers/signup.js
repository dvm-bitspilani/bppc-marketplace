import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  detail: ""
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        detail: action.detail
      }
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}

export default reducer;