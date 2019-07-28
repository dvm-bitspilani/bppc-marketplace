import React from "react";
import { connect } from "react-redux";

import BookCarousel from "../Modal/Carousel";
import "./SellerSummary.css";
import * as actions from "../../../store/actions/index";
import Spinner from "../../Spinner/Spinner";

class SellerSummary extends React.Component {
  state = {
    tags: ["new condition", "thermo table"]
  };

  componentDidMount() {
    this.props.fetchDetials(this.props.id);
  }

  render() {
    const tagList = this.props.tags.map((tag, index) => {
      return (
        <span key={index} className="tag">
          {tag}
        </span>
      );
    });

    const bookList = this.props.books.map((book, index) => {
      return <li key={index}>{book}</li>;
    });

    let body;
    if (this.props.loading) {
      body = <Spinner />;
    } else {
      body = (
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
            <div className="tags-div">{tagList}</div>
          </div>

          <BookCarousel images={this.props.images} />

          <br />
          <p> List of all books available with {this.props.seller.name}: </p>
          <ul>{bookList}</ul>
        </div>
      );
    }

    return body;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    details: state.details,
    description: state.description,
    images: state.images,
    tags: state.tags,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDetails: id => dispatch(actions.fetchDetials(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerSummary);
