import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const signupSuccess = detail => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    detail: detail
  };
};

export const signupFail = error => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  };
};

export const signup = signupData => {
  // assuming signupData is an object with all required fields

  return dispatch => {
    dispatch(signupStart());
    axios
      .post("/api/auth/signup/", signupData)
      .then(response => {
        console.log(response);
        dispatch(signupSuccess(response.data.detail));
      })
      .catch(err => {
        console.log(err);
        dispatch(signupFail(err));
      });
  };
};
