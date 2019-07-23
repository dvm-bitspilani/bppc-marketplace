import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

// import { navigate } from "@reach/router";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (username, password, id_token) => {
  if (id_token !== null) {
    // google login
    console.log("google login called");
    let googleAuthData = { id_token: id_token };
    return dispatch => {
      dispatch(authStart());
      axios
        .post("/api/auth/login/", googleAuthData)
        .then(response => {
          console.log(response);
          localStorage.setItem("token", response.data.JWT);
          dispatch(authSuccess(response.data));
        })
        .catch(err => {
          window.alert(err.response.data.display_message);
          dispatch(authFail(err));
        });
    };
  }
  let authData = {
    username: username,
    password: password
  };
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/api/auth/login/", authData)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.JWT);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        window.alert(err.response.data.display_message);
        dispatch(authFail(err));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess());
    }
  }
}
