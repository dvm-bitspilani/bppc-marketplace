import * as actionTypes from "../actions/actionTypes";
const axios = require("axios");

const initialState = {
  books: [
   
  ],
  transferList1: [],
  transferList2: [],
  transferredList1: [],
  imagesupload: [],
  tags: ["abc","def"],
  details:"Everything",
  description:"Good Condition",
  price: 4500,
  book_ids: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SELL_START:
      { 
        console.log(action.response);
      return Object.assign({}, state, {
        ...state,
        books:action.response.books,
        transferredList1: action.response.selected_books,
        tags: action.response.tags,
        details: action.response.details,
        description: action.response.description,
        price: action.response.price
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
        { let object = { ...state,
          tags: action.tags,
          details:action.details,
          description: action.description}
          console.log(object);
          return{
            ...state,
            tags: action.tags,
            details:action.details,
            description: action.description,
          }
        } 
        break;
      case actionTypes.PRICE:
        {
          let price = {
            ...state,
            price: action.price
          }
          return price
        }
      case actionTypes.SELL_END:
        { 
          let booksids=[];
          let books = state.transferredList1;
          books.map(({title,id,category})=>{
            booksids.push((parseInt(id)-1000));
          })

          let authData = {
            details: state.details,
            description:state.description,
            price: state.price,
            tags: state.tags,
            book_ids:booksids       
        }
        axios
        .post("http://market.bits-dvm.org/api/sell/", authData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" :"JWT "+ action.token            
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });

        return state;
        }
    default:
      return state;
  }
};

export default reducer;
