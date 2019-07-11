import React, { Component } from "react";
// import { Router, Link } from "react-router-dom";

import { Table } from "reactstrap";
import Modal from "../components/Modal/Modal";
// import SellerSummary from "../components/SellerSummary/SellerSummary";

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
    console.log("modal shown");
    this.setState({
      showModal: true,
      seller: seller
    });
  };

  hideModal = () => {
    console.log("modal hidden");
    this.setState({
      showModal: false
    });
  };

  render() {
    return (
      <div>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Name of Seller</th>
              <th>Price</th>
              <th>No. of books</th>
            </tr>
          </thead>
          <tbody>
            {/* -------------- rendering table rows ---------------- */}
            {this.state.tableData.map((seller, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={require("../assets/avatars/tn.jpg")}
                      height="100"
                      width="100"
                    />
                  </td>
                  <td onClick={() => this.showModal(seller)}>{seller.name}</td>
                  <td>{seller.price}</td>
                  <td>{seller.numBooks.toString() + "/10"}</td>
                </tr>
              );
            })}
            {/* --------------------------------------------------- */}
          </tbody>
        </Table>
        <Modal show={this.state.showModal}>
          <div className="close-modal" onClick={() => this.hideModal()}>
            Close
          </div>
          {/* <SellerSummary seller={this.state.seller} /> */}
        </Modal>
      </div>
    );
  }
}

export default Buy;
