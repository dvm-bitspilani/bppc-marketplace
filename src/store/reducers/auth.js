import * as actionTypes from "../actions/actionTypes";
import { navigate } from "@reach/router";

const initialState = {
  token: null,
  userId: null,
  name: null,
  email: null,
  error: null,
  new_bitsian: null,
  loading: false,
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
        console.log(action.authData.new_bitsian);
      return {
        ...state,
        token: action.authData.JWT,
        userId: action.authData.user_id,
        name: action.authData.name,
        email: action.authData.email,
        new_bitsian: action.authData.new_bitsian,
        error: null,
        loading: false
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
      case actionTypes.AUTH_END:
        return{
        ...state
        }    
    default:
      return state
  }
};

export default reducer;
