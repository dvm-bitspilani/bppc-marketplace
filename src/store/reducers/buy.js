import * as actionTypes from "../actions/actionTypes";

const initialState = {
  sellers: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SELLERS_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.GET_SELLERS_SUCCESS:
      const sellers = [];
      for (let sellerFetched of action.sellers) {
        let seller = Object.assign({}, { ...sellerFetched });
        sellers.push(seller);
      }
      console.log(sellers);

      return {
        ...state,
        sellers: sellers,
        error: null,
        loading: false
      };
    case actionTypes.GET_SELLERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
