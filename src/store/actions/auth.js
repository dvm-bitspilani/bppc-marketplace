import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

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

export const auth = (username, password) => {
  return dispatch => {
    let authData = {
      username: username,
      password: password
    };
    dispatch(authStart());
    axios
      .post("/api/login/", authData)
      .then(response => {
        console.log("connected!");
        console.log(response);
        dispatch(authSuccess(response.data));
        // navigate to dashboard once the user is authenticated
        navigate("/dashboard");
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const googleAuth = id_token => {
  let googleAuthData = { id_token: id_token };

  return dispatch => {
    dispatch(authStart());
    axios
      .post("/api/login/", googleAuthData)
      .then(response => {
        console.log("logged in with google and communicated with server");
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log("error from server");
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
