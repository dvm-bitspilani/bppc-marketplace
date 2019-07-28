import React from "react";

import BookCarousel from "../Modal/Carousel";
import "./SellerSummary.css";

// const SellerSummary = props => {

class SellerSummary extends React.Component {
  state = {
    tags: ["new condition", "thermo table"]
  };

  componentDidMount() {

  }

  render() {
    const tagList = this.state.tags.map((tag, index) => {
      return <span key={index} className="tag">{tag}</span>;
    });

    return (
      <div className="Summary">
        <h1>Seller Details</h1>

        <table className="summaryTable">
          <tbody>
            <tr>
              <td>Name of Seller:</td>
              <td>{this.props.seller.name}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{this.props.seller.price}</td>
            </tr>
            <tr>
              <td>Number of books available:</td>
              <td>{this.props.seller.numBooks}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="tags">
          <div className="tags-header">Tags:</div>
          <div className="tags-div">
            {tagList}
          </div>
        </div>

        <BookCarousel />

        <br />
        <p> List of all books available with {this.props.seller.name}: </p>
        <ul>
          <li>Thermodynics Course book</li>
          <li>Gen Bio course book</li>
          <li>CP reference book</li>
        </ul>
      </div>
    );
  }
}

export default SellerSummary;
