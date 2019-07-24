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
  transferList1: [],
  transferList2: [],
  transferredList1: [],
  imagesupload: [],
  tags: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELL_START:
      return {
        ...state
      };
    case actionTypes.TRANSFER_LIST:
      return {
        ...state,
        books: action.transferSuccess.books,
        transferredList1: action.transferSuccess.transferredList1,
        imagesupload: action.imageTransfer.filestate
      };

    default:
      return state;
  }
};

export default reducer;
