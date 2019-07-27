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
  // let count = 1;
  if (action.type === actionTypes.SELL_START) {
    // let object;
    // let books =this;
    // let transferredList1 = [];
    // if(count == 1){

    //   axios
    //   .get("http://market.bits-dvm.org/api/sell/",{
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization" :"JWT "+ action.token
    //     }
    //   })
    //   .then(books=books ,response => {
    //     books.array =response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

     
    //   count =2;
    //   console.log(books)
    //   object = { 
    //     ...state,
    //     books: books,
    //     transferredList1: transferredList1  
    //   }
    //   console.log(object,count);
    // }


    // else{
    //   object = {
    //     ...state
    //   }
    //   console.log(object,count);
    // }
    // return object;
    console.log("books " + action.arr1 + "selected" + action.arr2);
    let object ={
      ...state,
      books:action.arr1,
      transferredList1: action.arr2
    }
    console.log(object)
    return object;
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
