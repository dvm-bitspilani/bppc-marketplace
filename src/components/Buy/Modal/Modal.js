import React, { Component } from "react";

import "./Modal.css";

class Modal extends Component {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div
        className="Modal"
        style={{
          transform: this.props.show ? "scale(1,1)" : "scale(0,0)",
          // display: this.props.show ? "block" : "none"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
