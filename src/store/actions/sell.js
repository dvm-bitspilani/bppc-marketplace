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
export const sellstart = (response) =>{
  return{
    type: actionTypes.SELL_START,
    arr1: response.books,
    arr2: response.selected_books,
    response : response
  }
}

export const description = (tags,details,description) =>{
  return{
    type: actionTypes.DESCRIPTION,
    tags,
    details,
    description
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
        // console.log(response.data.selected_books);
        dispatch(sellstart(response.data.books,response.data.selected_books));
      })
      .catch(error => {
        console.log(error);
      });
  }

}
export const updateDescription = (tags,details,description) =>{
  return {
      type: actionTypes.DESCRIPTION,
      tags,
      details,
      description
  }
}
export const priceUpdate = (price) => {
  return{
    type: actionTypes.PRICE,
    price: price
  }
}
export const sellEnd = (token) => {
  return{
    type: actionTypes.SELL_END,
    token: token
  }
}
