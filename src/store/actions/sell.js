import * as actionTypes from "./actionTypes";
import { returnStatement } from "@babel/types";
const axios = require("axios");
export const transferSuccess = newData => {
  return {
    type: actionTypes.TRANSFER_LIST,
    newData: newData
  };
};

export const imageTransfer = images => {
  return {
    type: actionTypes.IMAGE_UPLOAD,
    images: images 
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

export const updateimagestate = images => {
  return dispatch => {
    dispatch(imageTransfer(images));
  };
};
export const sellstart = (response) =>{

    let increasedIds=[];
    let selected_books = response.selected_books;
    selected_books.map(({title,id,category})=>{
      increasedIds.push({
        title: title,
        id : parseInt(id)+1000,
        category: category
      })
    });
    console.log(increasedIds);
    let booklist = response.books;
    let removedSelectedBooks=[];
    removedSelectedBooks = booklist.filter(function({title,id,category}){
      let isRemove = false;
      let selectedId = id;
      for(let i=0 ; i < selected_books.length ; i++){
        if(selectedId == selected_books[i].id){
          isRemove = true
          return;
        }
      }
      return !isRemove;
    }); 

    return{
      type: actionTypes.SELL_START,
      arr1: removedSelectedBooks,
      arr2: increasedIds,
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
      .get("https://market.bits-dvm.org/api/sell/",{
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
export const AfterAllStateUpdate = (token) => {
  return{
    type: actionTypes.SELL_END,
    token: token
  }
}
export const sellEnd = (token) => {
  return dispatch => {
    setTimeout(function() {
      dispatch(AfterAllStateUpdate(token))
     }, 
    300);
  }
}
