import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";
import SellerSummary from "./SellerSummary/SellerSummary";
import axios from "../../axios-instance";
import "./Buy.css";
import { navigate } from "@reach/router";
import * as actions from "../../store/actions/index";
// import Spinner from "../../components/Spinner/Spinner";

class Buy extends Component {
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.alert("Unauthenticated user. Please login first!");
      setTimeout(() => navigate("/login"), 100);
    }

    this.props.fetchSellers();
  }

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      seller: {}
    };
  }

  showModal = seller => {
    // console.log("modal shown");
    this.setState({
      showModal: true,
      seller: seller
    });
    axios
      .get("/api/SellerDetails/" + seller.id, {
        headers: { Authorization: "JWT " + localStorage.getItem("token") }
      })
      .then(response => {
        console.log(response);
        this.setState({
          details: response.data
        });
      })
      .catch(err => {
        console.log(err);
        window.alert(err.response.data.display_message);
      });
  };

  hideModal = () => {
    // console.log("modal hidden");
    this.setState({
      showModal: false,
      seller: {}
    });
  };

  render() {
    let body;
    if (localStorage.getItem("token")) {
      // if (this.props.loading) {
      //   body = <Spinner />
      // }
      body = (
        <div className="Buy">
          <br />
          <h4>SELLERS AVAILABLE: </h4>
          <br />
          <table>
            <thead>
              <tr className="header">
                <th className="index">#</th>
                <th>Name of Seller</th>
                <th>Tags</th>
                <th>Price</th>
                <th>No. of books</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/* -------------- rendering table rows ---------------- */}
              {this.props.sellers.map((seller, index) => {
                return (
                  <tr key={seller.id} className="data">
                    <td className="index">{index + 1}</td>
                    <td>{seller.name}</td>
                    <td />
                    <td>{seller.price}</td>
                    <td>{seller.no_of_books}</td>
                    <td>
                      <button
                        className="details"
                        onClick={() => this.showModal(seller)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* --------------------------------------------------- */}
            </tbody>
          </table>
          {this.props.sellers.length > 0 ? (
            <Modal show={this.state.showModal}>
              <div className="close-modal" onClick={() => this.hideModal()}>
                Close
              </div>
              {this.state.details ? (
                <SellerSummary
                  seller={this.state.seller}
                  details={this.state.details}
                />
              ) : null}
            </Modal>
          ) : null}
        </div>
      );
    } else {
      body = <div> </div>;
    }

    return body;
  }
}

const mapStateToProps = state => {
  return {
    sellers: state.buy.sellers,
    error: state.buy.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSellers: () => dispatch(actions.fetchSellers()),
    onFetchDetails: id => dispatch(actions.fetchDetails(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy);
