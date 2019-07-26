import * as actionTypes from "./actionTypes";
import { returnStatement } from "@babel/types";

export const transferSuccess = newData => {
  return {
    type: actionTypes.TRANSFER_LIST,
    newData: newData
  };
};

export const imageTransfer = file => {
  return {
    type: actionTypes.TRANSFER_LIST,
    filestate: file
  };
};

export const updatestate = (arr, arr1) => {
  let updatedData = {
    books: arr,
    transferredList1: arr1
  };
  return {
    // dispatch(transferSuccess(updatedData));
    type: actionTypes.TRANSFER_LIST,
    books: arr,
    transferredList1: arr1
  };
};

export const updateimagestate = inputfile => {
  let updateimagestate = {
    file: inputfile
  };
  return dispatch => {
    dispatch(imageTransfer(updateimagestate));
  };
};
export const sellstart = (token)=>{
  return{
    type: actionTypes.SELL_START,
    token: token
  }
}
