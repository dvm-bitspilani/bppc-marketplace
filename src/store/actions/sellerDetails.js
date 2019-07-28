import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

export const fetchDetailStart = () => {
  return {
    type: actionTypes.GET_SELLERS__DETAILS_START
  };
};

export const fetchDetailsSucess = data => {
  return {
    type: actionTypes.GET_SELLERS_DETAILS_SUCCESS,
    sellerData: data
  };
};

export const fetchDetailsError = err => {
  return {
    type: actionTypes.GET_SELLERS_DETAILS_FAIL,
    error: err
  };
};

export const fetchDetials = sellerId => {
  return dispatch => {
    dispatch(fetchDetailsSucess());
    axios
      .get("/api/SellerDetails/" + sellerId)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};