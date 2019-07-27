import * as actionTypes from "../actions/actionTypes";
const axios = require("axios");

const initialState = {
  books: [
   
  ],
  transferList1: [],
  transferList2: [],
  transferredList1: [],
  imagesupload: [],
  tags: [],
  details:"",
  description:"",
  price: null,
  tags: [],
  book_ids: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SELL_START:
      {  
      return Object.assign({}, state, {
        ...state,
        books:action.arr1,
        transferredList1: action.arr2
    });}
      break;
    case actionTypes.TRANSFER_LIST:
      {
       return{
          ...state,
          books: action.books,
          transferredList1: action.transferredList1  
        }
      }
      break;
      case actionTypes.DESCRIPTION:
        {
          return{
            ...state,
            tags: action.tags,
            details:action.details,
            description: action.description
          }
        }    
    default:
      return state;
  }
};

export default reducer;
