import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

export const getSellerStart = () => {
  return {
    type: actionTypes.GET_SELLERS_START
  };
};

export const getSellerSuccess = sellers => {
  return {
    type: actionTypes.GET_SELLERS_SUCCESS,
    sellers: sellers
  };
};

export const getSellerError = (error) => {
  return {
    type: actionTypes.GET_SELLERS_FAIL,
    error: error
  };
};

export const fetchSellers = () => {
  return dispatch => {
    dispatch(getSellerStart());
    axios
      .get("/api/SellerList/", {
        headers: {"Authorization": "JWT " + localStorage.getItem("token")}
      })
      .then(response => {
        console.log(response);
        dispatch(getSellerSuccess(response.data.sellers))
      })
      .catch(err => {
        console.log(err);
        dispatch(getSellerError(err))
      });
  };
};
