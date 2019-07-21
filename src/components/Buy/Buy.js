import React, { Component } from "react";
// import { Router, Link } from "react-router-dom";

// import { Table } from "reactstrap";
import Modal from "./Modal/Modal";
import SellerSummary from "./SellerSummary/SellerSummary";
import "./Buy.css";

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      tableData: [
        {
          name: "Shreyans Jain",
          price: 3500,
          numBooks: 7
        },
        {
          name: "Shreyans",
          price: 4000,
          numBooks: 6
        }
      ],
      seller: {}
    };
  }

  showModal = seller => {
    // console.log("modal shown");
    this.setState({
      showModal: true,
      seller: seller
    });
  };

  hideModal = () => {
    // console.log("modal hidden");
    this.setState({
      showModal: false
    });
  };

  render() {
    return (
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
            {this.state.tableData.map((seller, index) => {
              return (
                <tr key={index} className="data">
                  <td className="index">{index + 1}</td>
                  <td>{seller.name}</td>
                  <td />
                  <td>{seller.price}</td>
                  <td>{seller.numBooks.toString() + "/10"}</td>
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
        <Modal show={this.state.showModal}>
          <div className="close-modal" onClick={() => this.hideModal()}>
            Close
          </div>
          <SellerSummary seller={this.state.seller} />
        </Modal>
      </div>
    );
  }
}

export default Buy;
