import * as actionTypes from "./actionTypes";

export const transferSuccess = newData => {
  return {
    type: actionTypes.TRANSFER_LIST,
    newData: newData
  };
};

export const updatestate = (arr, arr1) => {
  let updatedData = {
    books: arr,
    transferredList1: arr1
  };
  return dispatch => {
    dispatch(transferSuccess(updatedData));
  };
};
