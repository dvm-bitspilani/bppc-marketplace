import * as actionTypes from "../actions/actionTypes";
const axios = require("axios");

const initialState = {
  books: [
   
  ],
  transferList1: [],
  transferList2: [],
  transferredList1: [],
  imagesUpload: [],
  tags: [],
  details:"",
  description:"",
  price: 4500,
  book_ids: [],
  dataGot:[
  //   {
  //     id:56,
  //     name: "lake", 
  //     url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
  //   },
  //   {
  //   id:57,         
  //   name:"trees", 
  //   url: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
   ],
  newImages:[],
  imagesRemoved: [],
  newAndOld:[
    // {
    //   id:56,
    //   name: "lake", 
    //   url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg"
    // },
    // {
    // id:57,         
    // name:"trees", 
    // url: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
  ],
  // imagesRemoved:[]
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SELL_START:
      {   
        //  let object = {
        //   ...state,
        //   books:action.arr1,
        //   transferredList1: action.arr2,
        //   tags: action.response.tags,
        //   details: action.response.details,
        //   description: action.response.description,
        //   price: action.response.price
        // }
        // console.log(object);
        console.log(action.response.images);
        return Object.assign({}, state, {
          ...state,
          books: action.arr1,
          transferredList1: action.arr2,
          tags: action.response.tags,
          details: action.response.details,
          description: action.response.description,
          price: action.response.price,
          dataGot: action.response.images,
          newAndOld: action.response.images
        });
      }
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
          //  let object = { ...state,
        //   tags: action.tags,
        //   details:action.details,
        //   description: action.description}
        //   console.log(object);
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

      case actionTypes.IMAGE_UPLOAD:
        {
          return{
            ...state,
            dataGot: action.data.dataGot,
            newImages:action.data.newImages,
            imagesRemoved: action.data.imagesRemoved,
            newAndOld:action.data.newAndOld
          }
        }
      case actionTypes.SELL_END:
        { 
          let booksids=[];
          let books = state.transferredList1;
          books.map(({title,id,category})=>{
            booksids.push((parseInt(id)-1000));
          })
          // console.log(booksids);
          // console.log(state.price);
          let newImages = state.newImages;
          let newImagesFiles = [];
          for(let i=0 ; i< newImages.length ; i++){
            newImagesFiles.push(newImages[i].imageFile);
          }
          // console.log(newImagesFiles)
          var formData = new FormData();
          formData.append('details',state.details);
          formData.append('description',state.description);
          formData.append('price',state.price);
          formData.append('tags',state.tags);
          formData.append('book_ids',booksids);
          formData.append('deleted_image_ids',state.imagesRemoved);
          for(let i=0; i < newImagesFiles.length; i++){
            formData.append('images-'+i,newImagesFiles[i]);
          }
          console.log(formData);
          let authData = {
            details: state.details,
            description:state.description,
            price: state.price,
            tags: state.tags,
            book_ids:booksids,
            deleted_image_ids: state.imagesRemoved,
            images: newImagesFiles
          }
          console.log(authData);
        axios
        .post("https://market.bits-dvm.org/api/sell/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" :"JWT "+ action.token            
          }
        })
        .then(response => {
          alert(response.data.display_message);
        })
        .catch(error => {
          alert(error.response.data.display_message);
        });

        return state;
        }
    default:
      return state;
  }
};

export default reducer;
