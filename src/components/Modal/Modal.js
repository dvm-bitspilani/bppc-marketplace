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
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
