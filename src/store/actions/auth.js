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
  localStorage.removeItem("isGoogle");
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
          localStorage.setItem("isGoogle", true);
          dispatch(authSuccess(response.data));
        })
        .catch(err => {
          console.log(err);
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
        localStorage.setItem("isGoogle", false);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
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
export const authEnd = () => {
  // if (state.token !== null){
  //   // login was successful
  //   console.log(state.email , state.new_bitsian);
  //   if (state.email !== "" &&  state.new_bitsian === true){
  //     // logged in with google and first time login
  //     // redirect to detail collction page
  //     setTimeout(() => navigate("/detailsCollection"), 100);
  //   }
  //   // normal login
  //   // redirect to dashboard
  //   setTimeout(() => navigate("/dashboard"), 100);
  // }

  return {
    type: actionTypes.AUTH_END
  }
}
