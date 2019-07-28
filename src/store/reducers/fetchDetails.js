import * as actionTypes from "../actions/actionTypes";

const initialState = {
  details: "",
  description: "",
  images: [],
  tags: [],
  books: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SELLERS__DETAILS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.GET_SELLERS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        details: action.sellerData.details,
        description: action.sellerData.description,
        images: action.sellerData.images,
        tags: action.sellerData.tags,
        books: action.sellerData.books
      }
    case actionTypes.GET_SELLERS_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state;
  }
};

export default reducer;