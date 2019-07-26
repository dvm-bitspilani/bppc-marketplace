import * as actionTypes from "../actions/actionTypes";
const axios = require("axios");

const initialState = {
  books: [
    // {
    //     id: "5",
    //     category: "Thermodynamics",
    //     title: "Textbook",
    // },
    // {
    //     title: "Reference Book",
    //     id: "7",
    //     category: "Thermodynamics"
    // },
    // {
    //     title: "Handbook",
    //     id: "15",
    //     category: "Gen Bio"
    // }
  ],
  transferList1: [],
  transferList2: [],
  transferredList1: [],
  imagesupload: [],
  tags: []
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.SELL_START) {
    return{
      ...state,
      books: action.arr1,
      transferredList1: action.arr2  
    }
  }
  if (action.type === actionTypes.TRANSFER_LIST) {
  
    return{
      ...state,
      books: action.arr1,
      transferredList1: action.arr2  
    }
  }
  return state;

};

export default reducer;
