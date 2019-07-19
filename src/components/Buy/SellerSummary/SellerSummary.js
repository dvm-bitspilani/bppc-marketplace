import React from "react";

import BookCarousel from '../Modal/Carousel';
// const carousel_items = [
//   {
//     src: "https://picsum.photos/300",
//     altText: "Image 1",
//     caption: "Book 1",
//   },
//   {
//     src: "https://picsum.photos/300",
//     altText: "Image 1",
//     caption: "Book 1",
//   },
//   {
//     src: "https://picsum.photos/300",
//     altText: "Image 1",
//     caption: "Book 1",
//   }
// ]

const SellerSummary = props => {
  return (
    <div>
      <h1>Seller Details</h1>
      <p>Name of Seller: {props.seller.name}</p>
      <p>Price: Rs.{props.seller.price}</p>
      <p>Number of books available: {props.seller.numBooks} out of 10</p>
      <BookCarousel />
      <br />
      <p> List of all books available with {props.seller.name}: </p>
      <ul>
        <li>Thermodynics Course book</li>
        <li>Gen Bio course book</li>
        <li>CP reference book</li>
      </ul>
    </div>
  );
};

export default SellerSummary;
