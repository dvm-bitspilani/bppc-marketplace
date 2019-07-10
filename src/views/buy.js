import React, { Component } from "react";
import { Router, Link } from "react-router-dom";

import {Table} from 'reactstrap';
class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showFullYearForm: false
    };
  }

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
            <tr>
              <td><img src="../assets/avatars/tn.jpg" height="100" width="100"></img></td>
              <td>Johny English</td>
              <td>3500</td>
              <td>7/10</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Buy;
