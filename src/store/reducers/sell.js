import * as actionTypes from "../actions/actionTypes";

const initialState = {
  books: [
    {
      id: 1,
      category: "Thermodynamics",
      title: "Book "
    },
    {
      id: 2,
      category: "Thermodynamics",
      title: "Book "
    },
    {
      id: 3,
      category: "MeOW",
      title: "Book 1"
    },
    {
      id: 4,
      category: "MeOW",
      title: "Book 2"
    },
    {
      id: 5,
      category: "Biology",
      title: "Book 1"
    },
    {
      id: 6,
      category: "Biology",
      title: "Book 2"
    }
  ],
  transferredList1: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELL_START:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default reducer;
