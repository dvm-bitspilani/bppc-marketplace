import React, { Component } from "react";
import { navigate } from "@reach/router/lib/history";

class Redirect extends Component {
  componentDidMount() {
    navigate(`${this.props.to}`)
  }
  render() {
    return <div> </div>;
  }
}

export default Redirect;
