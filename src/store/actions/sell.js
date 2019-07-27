import * as actionTypes from "./actionTypes";
import { returnStatement } from "@babel/types";
const axios = require("axios");
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
export const sellstart = (arr1,arr2)=>{
  return{
    type: actionTypes.SELL_START,
    arr1,
    arr2
  }
}
export const getData = (token) => {
  return dispatch => {
    axios
      .get("http://market.bits-dvm.org/api/sell/",{
        headers: {
          "Content-Type": "application/json",
          "Authorization" :"JWT "+ token
        }
      })
      .then(response => {
        console.log(response.data.selected_books);
        dispatch(sellstart(response.data.books,response.data.selected_books));
      })
      .catch(error => {
        console.log(error);
      });
  }

}
