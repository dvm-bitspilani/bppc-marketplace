import React, { Component } from "react";
// import { Router, Link } from "react-router-dom";

import { Table } from "reactstrap";
import Modal from "../components/Modal";

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
      ]
    };
  }

  showModal = () => {
    console.log("modal shown");
    this.setState({
      showModal: true
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
            {this.state.tableData.map((seller, index) => {
              return (
                <tr>
                  <td>
                    <img
                      src="../assets/avatars/tn.jpg"
                      height="100"
                      width="100"
                    />
                  </td>
                  <td onClick={() => this.showModal()}>{seller.name}</td>
                  <td>{seller.price}</td>
                  <td>{seller.numBooks.toString() + "/10"}</td>
                </tr>
              );
            })}
            {/* <tr>
              <td>
                <img src="../assets/avatars/tn.jpg" height="100" width="100" />
              </td>
              <td onClick={() => this.showModal()}>Johny English</td>
              <td>3500</td>
              <td>7/10</td>
            </tr>
            <tr>
              <td>
                <img src="../assets/avatars/tn.jpg" height="100" width="100" />
              </td>
              <td onClick={() => this.showModal()}>Johny English</td>
              <td>3500</td>
              <td>7/10</td>
            </tr> */}
          </tbody>
        </Table>
        <Modal show={this.state.showModal}>
          <div className="close" onClick={() => this.hideModal()}>
            Close
          </div>
        </Modal>
      </div>
    );
  }
}

export default Buy;
